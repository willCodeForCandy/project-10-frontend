import './JoinEventButton.css';
import { showToast } from '../Toast/Toast';
import { mainRoute } from '../../Data/mainRoutes';
import { apiRequest } from '../../Utils/apiRequest';

export const JoinEventButton = (buttonContainer, eventObject) => {
  //Si el usuario está identificado, verá un botón para manejar su asistencia a eventos
  if (localStorage.getItem('token')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const eventId = eventObject._id;
    const joinEventButton = document.createElement('button');
    const userIsGoing = eventObject.assistants.find(
      assistant => assistant._id === user._id
    );
    if (userIsGoing) {
      //Si ya está anotado, el botón le permite darse de baja
      joinEventButton.textContent = 'Darme de baja';
      joinEventButton.classList.add('negative');
      joinEventButton.addEventListener('click', e => {
        leaveEvent(e, eventId);
      });
    } else {
      //Si no está anotado, click en el botón para informar su asistencia
      joinEventButton.textContent = 'Unirme';
      joinEventButton.addEventListener('click', e => {
        joinEvent(e, eventId, user._id);
      });
    }
    buttonContainer.append(joinEventButton);
  }
};

/* Lógica para sumarse al evento */
const joinEvent = async (e, eventId, userId) => {
  e.target.classList.add('loading');

  const res = await apiRequest({
    endpoint: 'events',
    id: eventId,
    method: 'PUT',
    body: { assistants: userId },
  });

  const response = await res.json();
  //Si sale todo bien, se actualiza el botón
  if (res.status === 200) {
    const { updatedEvent } = response;
    JoinEventButton(e.target.parentNode, updatedEvent);
    e.target.remove();
  } else {
    //Si no, se informa al usuario del error
    showToast(response, 'red');
  }
};

/* Lógica para bajarse del evento */
const leaveEvent = async (e, eventId) => {
  e.target.classList.add('loading');
  const token = localStorage.getItem('token');
  const res = await fetch(`${mainRoute}/events/${eventId}/removeAssistant`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
  });
  const response = await res.json();
  const { updatedEvent } = response;
  JoinEventButton(e.target.parentNode, updatedEvent);
  e.target.remove();
};
