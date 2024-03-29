import './UpcomingEvents.css';
import { dateComparator } from '../../Utils/dateComparator';
import { getEvents } from '../../Utils/getEvents';
const eventsLayout = async (parentNode) => {
  const loader = document.createElement('img');
  loader.src = './assets/Hourglass_loader.gif';
  const eventDiv = document.createElement('div');
  eventDiv.append(loader);
  parentNode.append(eventDiv);
  const listOfEvents = await getEvents();
  for (let event of listOfEvents) {
    event = dateComparator(event);
    if (event.isUpcoming) {
      /* Contenedores */
      const eventContainer = document.createElement('article');
      eventContainer.classList.add('flex-container');
      const dataContainer = document.createElement('div');
      dataContainer.classList.add('event-info');
      const imgContainer = document.createElement('div');
      /* Datos */
      const eventName = document.createElement('h4');
      eventName.textContent = event.name;
      const eventDate = document.createElement('p');
      eventDate.textContent = event.date?.split('T')[0] || 'Fecha a confirmar';
      const eventLocation = document.createElement('p');
      eventLocation.textContent = event?.location || 'Ubicación a confirmar';
      const eventGame = document.createElement('p');
      eventGame.textContent = event.game?.title || 'Juego a confirmar';
      const eventPic = document.createElement('img');
      eventPic.src = event.game?.img[0];
      eventPic.alt = event.game?.name || 'Sin imagen para el evento';
      /* Organización de la información */
      dataContainer.append(eventName, eventGame, eventDate, eventLocation);
      imgContainer.append(eventPic);
      eventContainer.append(imgContainer, dataContainer);
      loader.remove();
      eventDiv.classList.add('events-container');
      eventDiv.append(eventContainer);
    }
  }
};

export const UpcomingEvents = async (parentNode) => {
  const eventsTitle = document.createElement('h2');
  eventsTitle.textContent = 'Próximos Eventos';
  parentNode.append(eventsTitle);
  await eventsLayout(parentNode);
};
