import { vercelUrl } from '../../../main';
import { createEventForm } from '../../Data/Forms';
import { getBoardgames } from '../../Utils/getBoardgames';
import { UserForm } from '../UserForm/UserForm';
import './NewEventForm.css';
import { showToast } from '../Toast/Toast';
import { EventCard } from '../EventCard/EventCard';
import { getEvents } from '../../Utils/getEvents';
import { listOfEvents } from '../EventsSection/EventsSection';

const postEvent = async e => {
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
      Authorization: `Bearer ${token}`,
    },
    method: 'POST',
    body: JSON.stringify({
      name,
      date,
      location,
      game: gameId,
    }),
  });

  const response = await res.json();
  if (res.status === 201) {
    const { message } = response;
    showToast(message, 'linear-gradient(to right, #00b09b, #96c93d)');
    document.querySelector('#create-event').remove();
    const upcomingEventsDiv = document.querySelector(
      'section.isUpcoming > div'
    );
    await listOfEvents(upcomingEventsDiv, 'isUpcoming');
  } else {
    showToast(response, 'red');
  }
};
export const NewEventForm = () => {
  const today = new Date();
  const eventFormContainer = document.createElement('section');
  eventFormContainer.id = 'create-event';

  const closeBtn = document.createElement('span');
  closeBtn.classList.add('material-symbols-outlined');
  closeBtn.textContent = 'close';
  closeBtn.addEventListener('click', () => eventFormContainer.remove());

  UserForm(eventFormContainer, 'Crea tu propio evento', createEventForm);

  const gameInputContainer = document.createElement('div');
  gameInputContainer.classList.add('input-container');
  gameInputContainer.innerHTML = `  <label class="iLabel" for="game">Juego</label>
  <input class="input" list="list-of-games" id="game" name="game">
  <datalist id="list-of-games"></datalist>`;
  eventFormContainer.append(closeBtn);
  document.body.append(eventFormContainer);
  document
    .querySelector('#create-event button')
    .insertAdjacentElement('beforebegin', gameInputContainer);
  eventFormContainer.classList.add('visible');

  const datalistOfGames = document.querySelector('#list-of-games');
  getBoardgames().then(listOfGames => {
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
