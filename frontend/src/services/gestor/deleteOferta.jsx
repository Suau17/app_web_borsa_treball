

export async function deleteOferta(props) {
    const { id } = props;
    const Url = `${import.meta.env.VITE_URL}/gestor/oferta/remove/${id}`
    let token = localStorage.getItem('vToken')
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    const response = await fetch(Url, requestOptions);
    const data = await response.json();
    console.log(data)
    return data;

}
