import { Events } from '../../Pages/Events/Events';
import { Home } from '../../Pages/Home/Home';
import { Login } from '../../Pages/Login/Login';
import { Register } from '../../Pages/Register/Register';
import './HeaderNav.css';

const navLayout = () => `
<ul class="flex-container">
  <li>
    <a href="#" id="home-link">Home</a>
  </li>
  <li>
    <a href="#" id="events-link">Eventos</a>
  </li>
  <li id="log-link">
    <a href="#">
      ${localStorage.getItem('token') ? 'Logout' : 'Identificarse'}
    </a>
  </li>
</ul>`;

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
  const homeLink = document.querySelector('#home-link');
  homeLink.addEventListener('click', Home);
  const eventsLink = document.querySelector('#events-link');
  eventsLink.addEventListener('click', Events);
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

export const cleanHeader = () => {
  const headerLinks = document.querySelectorAll('header > nav > ul > li > a');
  for (const link of headerLinks) {
    link.classList.remove('current-location');
  }
};
