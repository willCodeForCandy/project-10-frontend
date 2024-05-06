import './EventAssistanceButton.css';
import { showToast } from '../Toast/Toast';
import { mainRoute } from '../../Data/mainRoutes';
import { apiRequest } from '../../Utils/apiRequest';

export const EventAssistanceButton = (buttonContainer, eventObject) => {
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
        // leaveEvent(e, eventId);
        handleEventAssistance({ e, eventId, userIsGoing });
      });
    } else {
      //Si no está anotado, click en el botón para informar su asistencia
      joinEventButton.textContent = 'Unirme';
      joinEventButton.addEventListener('click', e => {
        // joinEvent(e, eventId, user._id);
        handleEventAssistance({ e, eventId, userId: user._id });
      });
    }
    buttonContainer.append(joinEventButton);
  }
};

const handleEventAssistance = async ({ e, eventId, userId, userIsGoing }) => {
  e.target.classList.add('loading');
  let res = {};
  if (userIsGoing) {
    //Si el usuario está anotado al evento, se lanza la petición para darlo de baja
    res = await apiRequest({
      endpoint: 'events',
      id: `${eventId}/removeAssistant`,
      method: 'PUT',
    });
  } else {
    //Si el usuario NO está anotado al evento, se agrega
    res = await apiRequest({
      endpoint: 'events',
      id: eventId,
      method: 'PUT',
      body: { assistants: userId },
    });
  }
  const response = await res.json();
  //En ambos casos, si sale todo bien, se actualiza el botón
  if (res.status === 200) {
    const { updatedEvent } = response;
    EventAssistanceButton(e.target.parentNode, updatedEvent);
    e.target.remove();
  } else {
    //Si no, se informa al usuario del error
    showToast(response, 'red');
  }
};
