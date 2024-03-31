import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { PastEvents } from '../../Components/PastEvents/PastEvents';
import { UpcomingEvents } from '../../Components/UpcomingEvents/UpcomingEvents';
import './Events.css';

export const Events = async () => {
  cleanHeader();
  const eventsLink = document.querySelector('#events-link');
  eventsLink.classList.add('current-location');
  const main = document.querySelector('main');
  main.innerHTML = '';
  await UpcomingEvents(main);
  await PastEvents(main);
};
