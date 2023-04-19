const url = `${import.meta.env.VITE_URL}/gestor/empresa/update/`

export async function updateEmpresa(props) {
    const {nom, direccion, sector} = props
    let token = localStorage.getItem('vToken')
    const empresa = {
        "nom":nom,
        "direccion":direccion,
        "sector":sector
    }
console.log(token)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(empresa),
    };

    const response = await fetch(url, requestOptions)
    console.log(response)
}