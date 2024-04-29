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

const loginSubmit = async e => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  loginRequest(username, password);
};

export const Login = () => {
  loginLayout();
  document.querySelector('#login form').addEventListener('submit', loginSubmit);
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
