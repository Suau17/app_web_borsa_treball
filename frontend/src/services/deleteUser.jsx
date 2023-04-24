import { toast } from "sonner";
import { getCookie } from "../context/cookies";
const Url = `${import.meta.env.VITE_URL}/admin/deleteUser`

export async function deleteUser(props){
    console.log(props)
    const {id} = props;
    const token = getCookie('vToken')
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${token}`
       },
        body: JSON.stringify({ id })
        
    };

        const response = await fetch(Url,requestOptions);
        const data = await response.json();
        console.log(data)
        if (response.status === 200) {
          toast.success(`Usuari eliminat amb éxit`);
        } else if (response.status >= 500 && response.status < 600) {
          toast.error('Ha ocorregut un error en el servidor');
        } else {
          toast.error(`Ha ocorregut un error al eliminar l'usuari`);
        }
        console.log(data)
        return data;
        
}
