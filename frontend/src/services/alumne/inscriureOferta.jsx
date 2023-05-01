import { toast } from 'sonner'
import { getCookie } from '../../context/cookies';

export async function inscriureOferta(props){

    const { idOferta } = props;
    console.log(props)

    const url = `${import.meta.env.VITE_URL}/estudiante/oferta/inscribirse`;
    let token = getCookie('vToken')

    const sendBody = {
        idOferta: idOferta,
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(sendBody),
    };
    console.log("put hecho")
    const response = await fetch(url, requestOptions)
    const data = await response.json();


    if (response.status === 200){
        toast.success("Registrado en la oferta con éxito.")
    } else if(403){
        toast.error(data.msg)
    } else if (response.status === 401){
        toast.error(data.msg)
    } else {
        toast.error("Error al registrarse en la oferta.")
    }
    
}