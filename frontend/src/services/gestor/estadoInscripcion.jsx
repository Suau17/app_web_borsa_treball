const url = `${import.meta.env.VITE_URL}/gestor/oferta/registrar`

export async function estadoInscripcion(props) {
    const {estado, id} = props

    const bodySend = {
        estado : estado,
        id : id
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(bodySend)
    };

    const response = await fetch(url, requestOptions)
    const data = await response.json()
}