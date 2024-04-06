import { vercelUrl } from '../../../main';
import { UserForm } from '../../Components/UserForm/UserForm';
import { registerForm } from '../../Data/Forms';
import { Login } from '../Login/Login';
import './Register.css';

const registerLayout = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  //Creo el contenedor para el formulario de registro
  const registerSection = document.createElement('section');
  registerSection.id = 'register';
  //Creo el formulario y sus componentes
  UserForm(registerSection, 'Register', registerForm);
  const isRegisteredQuery = document.createElement('p');
  isRegisteredQuery.innerHTML = `¿Ya estás registrado? <a href=#>Login</a>`;
  const title = registerSection.querySelector('h2');
  title.insertAdjacentElement('afterend', isRegisteredQuery);
  isRegisteredQuery.querySelector('a').addEventListener('click', Login);
  main.append(registerSection);
};

const registerSubmit = async (e) => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  const response = await fetch(vercelUrl + '/users/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  const data = await response.json();
  if (response.status !== 201) {
    console.log(response, data);
  }

  Login();
};

export const Register = () => {
  registerLayout();
  document
    .querySelector('#register .submit')
    .addEventListener('click', registerSubmit);
};
