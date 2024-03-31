import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { NewEventForm } from '../../Components/NewEventForm/NewEventForm';
import { PastEvents } from '../../Components/PastEvents/PastEvents';
import { UpcomingEvents } from '../../Components/UpcomingEvents/UpcomingEvents';
import './Events.css';

export const Events = async () => {
  cleanHeader();
  const eventsLink = document.querySelector('#events-link');
  eventsLink.classList.add('current-location');
  const main = document.querySelector('main');
  main.innerHTML = '';
  const createEventButton = document.createElement('button');
  createEventButton.textContent = 'Crear un evento';
  createEventButton.id = 'create-event-btn';
  createEventButton.addEventListener('click', NewEventForm);
  main.append(createEventButton);
  await UpcomingEvents(main);
  await PastEvents(main);
};
