import { toast } from 'sonner'

export async function inscriureOferta(props){

    const { idOferta } = props;
    console.log(props)

    const url = `${import.meta.env.VITE_URL}/estudiante/oferta/inscribirse`;
    let token = localStorage.getItem('vToken')

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
    } else if (response.status === 401){
        toast.error("Ya estás registrado en la oferta.")
    } else {
        toast.error("Error al registrarse en la oferta.")
    }
    
}