let role = localStorage.getItem('vRole')
let token = localStorage.getItem('vToken')
let Url;
let requestOptions;
if (role == 'gestor') {
    Url = `${import.meta.env.VITE_URL}/gestor/getOfertas/`;
    requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },

    };
} else {
    Url = `${import.meta.env.VITE_URL}/app/getOfertas`;
    requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
}

export async function VerOfertas(page) {
    const response = await fetch(`${Url}?page=${page}`, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;

}