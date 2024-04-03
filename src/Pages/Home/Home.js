import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { Hero, heroData } from '../../Components/Hero/Hero';
import { EventsSection } from '../../Components/EventsSection/EventsSection';

import './Home.css';

export const Home = async () => {
  cleanHeader();
  const homeLink = document.querySelector('#home-link');
  homeLink.classList.add('current-location');

  const main = document.querySelector('main');
  Hero(main, heroData);

  await EventsSection(main, {
    title: 'Próximos Eventos',
    eventTiming: 'isUpcoming'
  });
};
