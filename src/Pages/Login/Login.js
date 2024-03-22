import { Header } from '../../Components/HeaderNav/HeaderNav';
import { UserForm } from '../../Components/UserForm/UserForm';
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
const local = 'http://localhost:3000';
const vercel = 'https://project-10-backend.vercel.app';
const loginSubmit = (e) => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  fetch(vercel + '/api/v1/users/login', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    })
  })
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem('token', response.token);
      Header();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const Login = () => {
  loginLayout();
  document
    .querySelector('#login .submit')
    .addEventListener('click', loginSubmit);
};
