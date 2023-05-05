import { toast } from "sonner";
import { getCookie } from "../../context/cookies";
export async function habilitarGestores(props) {
    const {id} = props
    console.log(id)
    const url = `${import.meta.env.VITE_URL}/admin/habilitarGestor/${id}`
    let token = getCookie('vToken')
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
    };

    const response = await fetch(url, requestOptions)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.status === 200) {
        toast.success(`Gestor habilitat amb éxit`);
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocorregut un error en el servidor');
      } else {
        toast.error(`Ha ocorregut un error al habilitar el gestor`);
      }
// location.reload()
}
