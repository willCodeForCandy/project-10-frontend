import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { Hero, heroData } from '../../Components/Hero/Hero';
import { UpcomingEvents } from '../../Components/UpcomingEvents/UpcomingEvents';
import './Home.css';

export const Home = async () => {
  cleanHeader();
  const homeLink = document.querySelector('#home-link');
  homeLink.classList.add('current-location');

  const main = document.querySelector('main');
  Hero(main, heroData);

  const eventSection = document.createElement('section');
  eventSection.id = 'next-events';
  main.append(eventSection);
  await UpcomingEvents(eventSection);
};
