import { vercelUrl } from '../../../main';
import { Header } from '../../Components/HeaderNav/HeaderNav';
import { showToast } from '../../Components/Toast/Toast';
import { UserForm } from '../../Components/UserForm/UserForm';
import { loginForm } from '../../Data/Forms';
import { Home } from '../Home/Home';
import './Login.css';

const loginLayout = () => {
  //Selecciono y limpio el main
  const main = document.querySelector('main');
  main.innerHTML = '';
  //Creo el contenedor para el formulario
  const loginSection = document.createElement('section');
  loginSection.id = 'login';
  //Creo el formulario y sus componentes
  UserForm(loginSection, 'Login', loginForm);
  main.append(loginSection);
};

export const loginSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  loginRequest(username, password);
  // const res = loginRequest(username, password);
  // const previousErrorMessage = document.querySelector('#login p');
  // if (res.status === 400) {
  //   previousErrorMessage?.remove();
  //   const loginErrorMessage = document.createElement('p');
  //   const submitButton = document.querySelector('button.submit');
  //   loginErrorMessage.innerText = 'Nombre de usuario o contraseña incorrecto';
  //   loginErrorMessage.style.color = 'var(--color-light-1)';
  //   submitButton.insertAdjacentElement('beforebegin', loginErrorMessage);
  // } else {
  //   previousErrorMessage?.remove();
  //   const response = await res.json();
  //   localStorage.setItem('token', response.token);
  //   localStorage.setItem('user', JSON.stringify(response.user));
  //   Header();
  //   Home();
  // }
};

export const Login = () => {
  loginLayout();
  document
    .querySelector('#login .submit')
    .addEventListener('click', loginSubmit);
};

export const loginRequest = async (username, password) => {
  const res = await fetch(vercelUrl + '/users/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (res.status === 200) {
    const response = await res.json();
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    Header();
    Home();
  } else {
    showToast('Nombre de usuario o contraseña incorrecto', 'red');
  }
};
