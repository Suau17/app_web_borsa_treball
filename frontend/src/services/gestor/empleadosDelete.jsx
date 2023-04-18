import { toast } from "sonner";
const url = `${import.meta.env.VITE_URL}/gestor/empresa/empleado/delete`

export async function deleteEmployee(id) {
    let token = localStorage.getItem('vToken')
    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      };

    const response = await fetch(url,requestOptions)
    const data = await response.json()
    if (response.status === 200) {
        toast.success('Empleado eliminado con éxito');
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al eliminar el empleado');
      }
    return data.empleados

}