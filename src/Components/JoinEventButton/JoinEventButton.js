import { vercelUrl } from '../../../main';
import './JoinEventButton.css';

export const JoinEventButton = (buttonContainer, eventObject) => {
  if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const eventId = eventObject._id;
    const joinEventButton = document.createElement('button');
    const userIsGoing = eventObject.assistants.find(
      (assistant) => assistant._id === user._id
    );
    if (userIsGoing) {
      joinEventButton.textContent = 'Darme de baja';
      joinEventButton.classList.add('negative');
      joinEventButton.addEventListener('click', (e) => {
        leaveEvent(e, eventId);
      });
    } else {
      joinEventButton.textContent = 'Unirme';
      joinEventButton.addEventListener('click', (e) => {
        joinEvent(e, eventId, user._id);
      });
    }
    buttonContainer.append(joinEventButton);
  }
};

const joinEvent = async (e, eventId, userId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(vercelUrl + '/events/' + eventId, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    method: 'PUT',
    body: JSON.stringify({
      assistants: userId
    })
  });
  const response = await res.json();
  const { updatedEvent } = response;
  JoinEventButton(e.target.parentNode, updatedEvent);
  e.target.remove();
};

const leaveEvent = async (e, eventId) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${vercelUrl}/events/${eventId}/removeAssistant`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'PUT'
  });
  const response = await res.json();
  const { updatedEvent } = response;
  JoinEventButton(e.target.parentNode, updatedEvent);
  e.target.remove();
};
