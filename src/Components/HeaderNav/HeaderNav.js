import { Login } from '../../Pages/Login/Login';
import { Register } from '../../Pages/Register/Register';
import './HeaderNav.css';

const navLayout = () => `

<ul class="flex-container">
  <li><a href="#" id="home-link">Home</a></li>
  <li><a href="#" id="events-link">Eventos</a></li>
  <li><a href="#" id="log-link">${
    localStorage.getItem('token') ? 'Logout' : 'Identificarse'
  }</a>
  </li>

</nav>`;

const loginMenuLayout = () => {
  const menuContainer = document.createElement('div');
  menuContainer.id = 'menu-login';
  const loginLink = document.createElement('a');
  loginLink.id = 'login-link';
  loginLink.innerText = 'Ingresar';
  const registerLink = document.createElement('a');
  registerLink.id = 'register-link';
  registerLink.innerText = 'Registrarme';
  loginLink.addEventListener('click', Login);
  registerLink.addEventListener('click', Register);
  menuContainer.append(loginLink, registerLink);
  return menuContainer;
};

export const Header = () => {
  const header = document.querySelector('header nav');
  header.innerHTML = navLayout();
  const logLink = document.querySelector('#log-link');
  if (localStorage.getItem('token')) {
    document.querySelector('#menu-login');
    logLink.addEventListener('click', () => {
      localStorage.removeItem('token');
      Header();
    });
  } else {
    logLink.append(loginMenuLayout());
  }
};
