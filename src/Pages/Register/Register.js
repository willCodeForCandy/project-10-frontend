import './Register.css';

const registerLayout = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  //Creo el contenedor para el formulario de registro
  const registerSection = document.createElement('section');
  registerSection.id = 'register';
  //Creo el formulario y sus componentes
  const registerForm = document.createElement('form');
  registerForm.classList.add('flex-container');
  registerForm.innerHTML = `
  <h2>Registro</h2>
<div class="input-container">
<input required="" autocomplete="off" type="text" class="input" id="username">
<label class="iLabel" for="username">Usuario</label>
</div>
<div class="input-container">
<input required="" autocomplete="off" type="email" class="input" id="email">
<label class="iLabel" for="email">Email</label>
</div>
<div class="input-container">
<input required="" type="password" class="input" id="password">
<label class="iLabel" for="password">Contraseña</label>
</div>
<button class=submit>Unirme</button>`;
  registerSection.append(registerForm);
  main.append(registerSection);
};
const local = 'http://localhost:3000';
const vercel = 'https://project-10-backend.vercel.app';
const registerSubmit = (e) => {
  e.preventDefault();
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;
  fetch(vercel + '/api/v1/users/register', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
  console.log('desde register');
};

export const Register = () => {
  registerLayout();
  document
    .querySelector('#register .submit')
    .addEventListener('click', registerSubmit);
};
