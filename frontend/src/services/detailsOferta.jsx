import { getCookie } from "../context/cookies";


export async function GetOferta(id) {
    const url = `${import.meta.env.VITE_URL}/app/oferta/${id}`
    console.log(url)
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
      return data
}