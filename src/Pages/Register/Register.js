import Toastify from 'toastify-js';
import { vercelUrl } from '../../../main';
import { UserForm } from '../../Components/UserForm/UserForm';
import { registerForm } from '../../Data/Forms';
import { Login, loginRequest } from '../Login/Login';
import './Register.css';
import { showToast } from '../../Components/Toast/Toast';

const registerLayout = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  //Creo el contenedor para el formulario de registro
  const registerSection = document.createElement('section');
  registerSection.id = 'register';
  //Creo el formulario
  UserForm(registerSection, 'Register', registerForm);
  //Agrego un link a la sección de registro
  const isRegisteredQuery = document.createElement('p');
  isRegisteredQuery.innerHTML = `¿Ya estás registrado? <a href=#>Login</a>`;
  const title = registerSection.querySelector('h2');
  title.insertAdjacentElement('afterend', isRegisteredQuery);
  isRegisteredQuery.querySelector('a').addEventListener('click', Login);
  //Agrego los componentes al contenedor
  main.append(registerSection);
};

const registerSubmit = async e => {
  e.preventDefault();
  //Recojo los datos del formulario
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  //Los envio a la BBDD con un post request
  const response = await fetch(vercelUrl + '/users/register', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  //Recojo la respuesta
  const data = await response.json();
  //Si hay algun error, lo muestro al usuario
  if (response.status !== 201) {
    showToast(data, 'red');
  } else {
    //Si no hay errores, logueo al usuario y redirijo al home
    loginRequest(username, password);
  }
};

export const Register = () => {
  registerLayout();
  document
    .querySelector('#register .submit')
    .addEventListener('click', registerSubmit);
};
