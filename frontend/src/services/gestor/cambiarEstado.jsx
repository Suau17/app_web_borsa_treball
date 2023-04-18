
export async function cambiarEstado(props) {
    const { inscripcion, action } = props
    const url = `${import.meta.env.VITE_URL}/gestor/oferta/estado/${inscripcion}`
    let token = localStorage.getItem('vToken')
    const sendBody = {
        "estado": action,
    }
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(sendBody),
    };

    const response = await fetch(url, requestOptions)
    console.log(response)
    const data = await response.json()
    location.reload()
}