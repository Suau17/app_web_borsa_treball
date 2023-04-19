const url = `${import.meta.env.VITE_URL}/gestor/oferta/registrar`

export async function RegisterOferta(props) {
    const { title, description, requirements, skills, ciclo, dateOfPublication } = props
    let token = localStorage.getItem('vToken')
    const bodySend = {
        "title": title,
        "description": description,

        "requirements":requirements,

        "skills": skills,
        "ciclo": ciclo,
        "dateOfPublication":dateOfPublication
    }
    console.log(bodySend)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(bodySend)
    };


    const response = await fetch(url, requestOptions)
 
    const data =  response;


    console.log(data)
}