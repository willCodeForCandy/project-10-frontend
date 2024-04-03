import './EventsSection.css';
import { dateComparator } from '../../Utils/dateComparator';
import { getEvents } from '../../Utils/getEvents';
import { EventCard } from '../EventCard/EventCard';

export const EventsSection = async (parentNode, { title, eventTiming }) => {
  const eventSection = document.createElement('section');
  eventSection.classList.add('events');
  const eventsTitle = document.createElement('h2');
  eventsTitle.textContent = title;
  eventSection.append(eventsTitle);
  const loader = document.createElement('img');
  loader.src = './assets/Hourglass_loader.gif';
  const eventDiv = document.createElement('div');
  eventDiv.append(loader);
  eventSection.append(eventDiv);
  const listOfEvents = await getEvents();
  for (let event of listOfEvents) {
    event = dateComparator(event);
    if (event[eventTiming]) {
      const eventCard = EventCard(event);
      loader.remove();
      eventDiv.classList.add('events-container');
      eventDiv.append(eventCard);
    }
  }
  parentNode.append(eventSection);
};
