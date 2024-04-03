import { vercelUrl } from '../../main';

export const getBoardgames = async () => {
  try {
    const res = await fetch(vercelUrl + '/boardgames/');
    const response = await res.json();
    return response; //! Devuelve una promesa!
  } catch (error) {
    console.log(error);
  }
};
