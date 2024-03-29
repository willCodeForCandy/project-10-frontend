import { heroData, heroSection } from '../../Components/Hero/Hero';
import { UpcomingEvents } from '../../Components/UpcomingEvents/UpcomingEvents';
import './Home.css';

export const Home = async () => {
  const main = document.querySelector('main');
  main.innerHTML = heroSection(heroData);
  const eventSection = document.querySelector('#next-events');
  await UpcomingEvents(eventSection);
};
