import { heroData, heroSection } from '../../Components/Hero/Hero';
import { getEvents } from '../../Utils/getEvents';
import './Home.css';
const eventsLayout = async () => {
  const listOfEvents = await getEvents();
  const eventSection = document.querySelector('#next-events');
  for (const event of listOfEvents) {
    /* Contenedores */
    const eventContainer = document.createElement('article');
    eventContainer.classList.add('flex-container');
    const dataContainer = document.createElement('div');
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
    eventSection.append(eventContainer);
  }
};
export const Home = async () => {
  const main = document.querySelector('main');
  main.innerHTML = heroSection(heroData);
  await eventsLayout();
};
