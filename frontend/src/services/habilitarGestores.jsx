import { toast } from "sonner";
export async function habilitarGestores(props) {
    const {id} = props
    const url = `${import.meta.env.VITE_URL}/admin/habilitarGestor/${id}`
    let token = localStorage.getItem('vToken')
      const sendBody = {
         id:id,
      }
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({ id })
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
