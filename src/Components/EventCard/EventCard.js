import { vercelUrl } from '../../../main';
import './EventCard.css';

export const EventCard = (eventObject) => {
  /* Contenedores */
  const eventContainer = document.createElement('article');
  eventContainer.classList.add('flex-container');
  const dataContainer = document.createElement('div');
  dataContainer.classList.add('event-info');
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  /* Datos */
  const eventName = document.createElement('h4');
  eventName.textContent = eventObject.name;
  const eventDate = document.createElement('p');
  eventDate.textContent =
    eventObject.date?.split('T')[0] || 'Fecha a confirmar';
  const eventLocation = document.createElement('p');
  eventLocation.textContent = eventObject?.location || 'Ubicación a confirmar';
  const eventGame = document.createElement('p');
  eventGame.textContent = eventObject.game?.title || 'Juego a confirmar';
  const eventPic = document.createElement('img');
  eventPic.src = eventObject.game?.img[0];
  eventPic.alt = eventObject.game?.name || 'Sin imagen para el evento';
  const joinEventButton = document.createElement('button');
  joinEventButton.textContent = 'Unirme';
  const { _id } = eventObject;
  joinEventButton.addEventListener('click', () => joinEvent(_id));
  /* Organización de la información */
  dataContainer.append(eventName, eventGame, eventDate, eventLocation);
  imgContainer.append(eventPic);
  eventContainer.append(imgContainer, dataContainer, joinEventButton);

  return eventContainer;
};

const joinEvent = async (eventId) => {
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const token = localStorage.getItem('token');
  const res = await fetch(vercelUrl + '/events/' + eventId, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'PUT',
    body: JSON.stringify({
      assistants: userId
    })
  });
};
