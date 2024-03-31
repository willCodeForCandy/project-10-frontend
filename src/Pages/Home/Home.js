import { cleanHeader } from '../../Components/HeaderNav/HeaderNav';
import { heroData, heroSection } from '../../Components/Hero/Hero';
import { UpcomingEvents } from '../../Components/UpcomingEvents/UpcomingEvents';
import './Home.css';

export const Home = async () => {
  cleanHeader();
  const homeLink = document.querySelector('#home-link');
  homeLink.classList.add('current-location');
  const main = document.querySelector('main');
  main.innerHTML = heroSection(heroData);
  const eventSection = document.querySelector('#next-events');
  await UpcomingEvents(eventSection);
};
