import axios from 'axios';
import { getCookie } from '../../context/cookies';

const url = `${import.meta.env.VITE_URL}/gestor/getUsers`;

export async function getUsers() {
  let token = getCookie('vToken')

  //   axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3002';
  // const response = await axios.get(url, { withCredentials: true });
  // console.log(response);
  // return response.data;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },
  };
  const response = await fetch(url, requestOptions)
  const data = await response.json();
  console.log(data)
}
