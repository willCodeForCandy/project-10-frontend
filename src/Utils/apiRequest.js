import { mainRoute } from '../Data/mainRoutes';

export const apiRequest = async ({ endpoint, id = '', method, body }) => {
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : null,
    },
    method: method.toUpperCase(),
  };
  if (body) {
    options['body'] = JSON.stringify(body);
  }
  //   console.log(token, options);
  const res = await fetch(`${mainRoute}/${endpoint}/${id}`, options);
  return res;
};
