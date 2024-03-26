import { vercelUrl } from '../../../main';
import { Header } from '../../Components/HeaderNav/HeaderNav';
import { UserForm } from '../../Components/UserForm/UserForm';
import { Home } from '../Home/Home';
import './Login.css';

const loginLayout = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  //Creo el contenedor para el formulario
  const loginSection = document.createElement('section');
  loginSection.id = 'login';
  //Creo el formulario y sus componentes
  const fields = [
    { id: 'username', name: 'Usuario', type: 'text' },
    { id: 'password', name: 'Contraseña', type: 'password' }
  ];
  UserForm(loginSection, 'Login', fields);
  main.append(loginSection);
};

const loginSubmit = async (e) => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const res = await fetch(vercelUrl + '/api/v1/users/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  });

  if (res.status === 400) {
    const loginErrorMessage = document.createElement('p');
    const submitButton = document.querySelector('button.submit');
    loginErrorMessage.innerText = 'Nombre de usuario o contraseña incorrecto';
    loginErrorMessage.style.color = 'var(--color-light)';
    submitButton.insertAdjacentElement('beforebegin', loginErrorMessage);
  } else {
    const response = await res.json();
    localStorage.setItem('token', response.token);
    Header();
    Home();
  }
};

export const Login = () => {
  loginLayout();
  document
    .querySelector('#login .submit')
    .addEventListener('click', loginSubmit);
};
