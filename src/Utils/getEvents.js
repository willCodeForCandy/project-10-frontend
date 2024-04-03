import { vercelUrl } from '../../main';

export const getEvents = async () => {
  try {
    const res = await fetch(vercelUrl + '/events/');
    const response = await res.json();
    return response; //! Devuelve una promesa!
  } catch (error) {
    console.log(error);
  }
};
