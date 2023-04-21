const url = `${import.meta.env.VITE_URL}/gestor/oferta/registrar`
import {  toast } from 'sonner'
import { getCookie } from '../../context/cookies'
export async function RegisterOferta(props) {
    const { title, description, requirements, skills, ciclo, dateOfPublication } = props
    let token = getCookie('vToken')
    const bodySend = {
        "title": title,
        "description": description,

        "requirements":requirements,

        "skills": skills,
        "ciclo": ciclo,
        "expirationDate":dateOfPublication
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

    if (response.status === 200) {
        toast.success('Oferta creada con éxito');
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al crear la oferta');
      }

}