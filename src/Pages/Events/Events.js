import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { NewEventForm } from '../../Components/NewEventForm/NewEventForm';
import { EventsSection } from '../../Components/EventsSection/EventsSection';
import './Events.css';
import { Register } from '../Register/Register';

export const Events = async () => {
  cleanHeader();
  const eventsLink = document.querySelector('#events-link');
  eventsLink.parentElement.classList.add('current-location');
  const main = document.querySelector('main');
  main.innerHTML = '';
  if (localStorage.getItem('token')) {
    const createEventButton = document.createElement('button');
    createEventButton.textContent = 'Crear un evento';
    createEventButton.id = 'create-event-btn';
    createEventButton.addEventListener('click', NewEventForm);
    main.append(createEventButton);
  } else {
    main.innerHTML = `
    <p class='aviso'>¡<a href=#>Regístrate</a> para poder crear tus propios eventos!</p>
    `;
    const linkRegistro = main.querySelector('.aviso a');
    linkRegistro.addEventListener('click', Register);
  }
  await EventsSection(main, {
    title: 'Próximos Eventos',
    eventTiming: 'isUpcoming'
  });
  await EventsSection(main, {
    title: 'Eventos Pasados',
    eventTiming: 'isPast'
  });
};
