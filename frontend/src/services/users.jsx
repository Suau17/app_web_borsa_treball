

const Url = `${import.meta.env.VITE_URL}/user/getUsers`;

export async function viewUsers(page){

    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json,',
    'Authorization': `${token}`

},
    };

    const response = await fetch(`${Url}?page=${page}`, requestOptions);
    const data = await response.json();
    return data
 
}