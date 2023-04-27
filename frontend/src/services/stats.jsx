import { getCookie } from "../context/cookies";

const Url = `${import.meta.env.VITE_URL}/admin/stats/`;

export async function statsOfertas() {

    let token = getCookie('vToken')

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    const response = await fetch((Url+'ofertas'), requestOptions);
    const data = await response.json();
    return data

}

export async function statsUsers() {

    let token = getCookie('vToken')

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    const response = await fetch((Url+'user'), requestOptions);
    const data = await response.json();
    console.log(response)
    return data

}