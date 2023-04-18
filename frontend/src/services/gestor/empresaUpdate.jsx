import { toast } from "sonner"
const url = `${import.meta.env.VITE_URL}/gestor/empresa/update/`

export async function updateEmpresa(props) {
    const {nom, direccion, sector} = props
    let token = localStorage.getItem('vToken')
    const empresa = {
        "nom":nom,
        "direccion":direccion,
        "sector":sector
    }
console.log(token)
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(empresa),
    };

    const response = await fetch(url, requestOptions)
    if (response.status === 200) {
        toast.success(`Empresa actualitzada amb éxit`);
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocorregut un error en el servidor');
      } else {
        toast.error(`Ha ocorregut un error al actualitzar l'oferta`);
      }
    console.log(response)
}