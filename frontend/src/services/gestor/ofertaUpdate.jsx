import { toast } from "sonner"
import { getCookie } from "../../context/cookies"
export async function updateOferta(props) {
    const {id, titulo, ciclo, requirments, skills,descripcion, sector, fechaExpiracion} = props
    
    const url = `${import.meta.env.VITE_URL}/gestor/oferta/update/${id}`
    const token = getCookie('vToken')
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
    if (response.status === 200) {
        toast.success('Oferta Actualizada con éxito');
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al actualizar la oferta');
      }
}