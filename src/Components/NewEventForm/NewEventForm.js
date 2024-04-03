import { vercelUrl } from '../../../main';
import { getBoardgames } from '../../Utils/getBoardgames';
import './NewEventForm.css';

const form = () => `
<form>
<label for="name">Nombre del evento</label>
<input type="text" name="name" id="name" />
<label for="location">Lugar</label>
<input type="text" name="location" id="location" />
<input type="date" name="date" id="date" />
<label for="game">Juego</label>
<input list="list-of-games" id="game" name="game">
<datalist id="list-of-games"></datalist>
<button type="submit">Crear</button>
</form>
`;

const postEvent = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  const name = document.querySelector('#name').value;
  const date = document.querySelector('#date').value;
  const location = document.querySelector('#location').value;
  const gameName = document.querySelector('#game').value;
  const dataList = document.querySelector('#list-of-games');
  const gameId = dataList
    .querySelector(`[value="${gameName}"]`)
    .getAttribute('data-id');
  const res = await fetch(vercelUrl + '/events/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify({
      name,
      date,
      location,
      game: gameId
    })
  });
};
export const NewEventForm = () => {
  const eventFormContainer = document.createElement('section');
  eventFormContainer.id = 'create-event';
  eventFormContainer.innerHTML = form();
  document.body.append(eventFormContainer);
  const datalistOfGames = document.querySelector('#list-of-games');
  getBoardgames().then((listOfGames) => {
    console.log(listOfGames);
    for (const game of listOfGames) {
      const option = document.createElement('option');
      option.value = game.title;
      option.setAttribute('data-id', game._id);
      datalistOfGames.append(option);
    }
  });
  document
    .querySelector('#create-event form')
    .addEventListener('submit', postEvent);
};
