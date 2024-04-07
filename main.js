import { Header } from './src/Components/HeaderNav/HeaderNav';
import { Home } from './src/Pages/Home/Home';
import './style.css';
import 'toastify-js/src/toastify.css';
export const localUrl = 'http://localhost:3000/api/v2';
export const vercelUrl = 'https://project-10-backend.vercel.app/api/v2';

Header();
Home();
