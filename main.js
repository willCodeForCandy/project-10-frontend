import { Register } from './src/Pages/Register/Register';
import './style.css';

const local = 'http://localhost:3000';
const vercel = 'https://project-10-backend.vercel.app';
Register();

// fetch(vercel + '/api/v1/boardgames')
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res[0]);
//   })
//   .catch((err) => console.log(err));
