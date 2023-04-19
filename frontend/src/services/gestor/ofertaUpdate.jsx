
export async function updateOferta(props) {
    const {id, titulo, ciclo, requirments, skills,descripcion, sector, fechaExpiracion} = props
    
    const url = `${import.meta.env.VITE_URL}/gestor/oferta/update/${id}`
    const token = localStorage.getItem('vToken')
    const bodySend = {
        title : titulo,
        description : descripcion,
        requirements : requirments,
        skills : skills,
        ciclo : ciclo,
        expirationDate : fechaExpiracion,
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(bodySend)
    };

    const response = await fetch(url, requestOptions)
    const data = await response.json()

}