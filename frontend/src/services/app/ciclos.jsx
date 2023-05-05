import { getCookie } from "../../context/cookies";

const url = `${import.meta.env.VITE_URL}/app/ciclo`;

export async function getCiclos() {
    let token = getCookie('vToken')
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      };

      const response = await fetch(url, requestOptions)
      const data = await response.json()
      return data.estudios
}