import { Header } from './src/Components/HeaderNav/HeaderNav';
import { Home } from './src/Pages/Home/Home';
// import { getEvents } from './src/Utils/getEvents';
import './style.css';
export const localUrl = 'http://localhost:3000';
export const vercelUrl = 'https://project-10-backend.vercel.app';
// Register();
Header();
Home();

// fetch(vercel + '/api/v2/boardgames')
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res[0]);
//   })
//   .catch((err) => console.log(err));
