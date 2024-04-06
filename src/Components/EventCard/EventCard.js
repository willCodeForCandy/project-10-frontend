import { JoinEventButton } from '../JoinEventButton/JoinEventButton';
import './EventCard.css';

export const EventCard = (eventObject) => {
  /* Contenedores */
  const eventContainer = document.createElement('article');
  eventContainer.classList.add('flex-container');
  eventContainer.innerHTML = `
  <div class="img-container">
    <img src="${eventObject.game?.img[0]}" alt="${
    eventObject.game?.name || 'Sin imagen para el evento'
  }"/>
  </div>
  <div class="event-info flex-container">
    <div>
      <h4>${eventObject.name}</h4>
      <p>${eventObject.game?.title || 'Juego a confirmar'}</p>
      <p>${eventObject.date?.split('T')[0] || 'Fecha a confirmar'}</p>
      <p>${eventObject?.location || 'Ubicación a confirmar'}</p>
    </div>
  </div>
  `;
  // const dataContainer = document.createElement('div');
  // dataContainer.classList.add('event-info');
  // const eventDescription = document.createElement('div');
  // const imgContainer = document.createElement('div');
  // imgContainer.classList.add('img-container');
  /* Datos */
  // const eventName = document.createElement('h4');
  // eventName.textContent = eventObject.name;
  // const eventDate = document.createElement('p');
  // eventDate.textContent =
  //   eventObject.date?.split('T')[0] || 'Fecha a confirmar';
  // const eventLocation = document.createElement('p');
  // eventLocation.textContent = eventObject?.location || 'Ubicación a confirmar';
  // const eventGame = document.createElement('p');
  // eventGame.textContent = eventObject.game?.title || 'Juego a confirmar';
  // const eventPic = document.createElement('img');
  // eventPic.src = eventObject.game?.img[0];
  // eventPic.alt = eventObject.game?.name || 'Sin imagen para el evento';
  /* Organización de la información */
  // dataContainer.append(eventName, eventGame, eventDate, eventLocation);
  // imgContainer.append(eventPic);
  // eventContainer.append(imgContainer, dataContainer);

  if (eventObject.isUpcoming) {
    JoinEventButton(eventContainer.querySelector('.event-info'), eventObject);
  }
  return eventContainer;
};
