import { toast } from 'sonner';
import { getCookie } from '../../context/cookies';

export async function deleteOferta(props) {
    const { id } = props;
    const Url = `${import.meta.env.VITE_URL}/gestor/oferta/remove/${id}`
    let token = getCookie('vToken')
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    const response = await fetch(Url, requestOptions);
    const data = await response.json();
    if (response.status === 200) {
        toast.success('Oferta eliminada con éxito');
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al eliminar la oferta');
      }
   
   

}
