import { getCookie } from "../../context/cookies";

const url = `${import.meta.env.VITE_URL}/user/profile`;

export async function GetProfile() {
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
      console.log(data.data)
      return data.data
}