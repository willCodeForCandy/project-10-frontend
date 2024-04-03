import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { NewEventForm } from '../../Components/NewEventForm/NewEventForm';
import { EventsSection } from '../../Components/EventsSection/EventsSection';
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
  await EventsSection(main, {
    title: 'Próximos Eventos',
    eventTiming: 'isUpcoming'
  });
  await EventsSection(main, {
    title: 'Eventos Pasados',
    eventTiming: 'isPast'
  });
};
