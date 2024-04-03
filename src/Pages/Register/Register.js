import { vercelUrl } from '../../../main';
import { UserForm } from '../../Components/UserForm/UserForm';
import './Register.css';

const registerLayout = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  //Creo el contenedor para el formulario de registro
  const registerSection = document.createElement('section');
  registerSection.id = 'register';
  //Creo el formulario y sus componentes
  const fields = [
    { id: 'username', name: 'Usuario', type: 'text' },
    { id: 'email', name: 'Email', type: 'email' },
    { id: 'password', name: 'Contraseña', type: 'password' }
  ];
  UserForm(registerSection, 'Register', fields);
  main.append(registerSection);
};

const registerSubmit = async (e) => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  try {
    await fetch(vercelUrl + '/users/register', {
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
  } catch (error) {
    console.log(error);
  }
};

export const Register = () => {
  registerLayout();
  document
    .querySelector('#register .submit')
    .addEventListener('click', registerSubmit);
};
