import { toast } from "sonner"
const url = `${import.meta.env.VITE_URL}/admin/ciclo/register`;
export async function RegisterCiclo(props){
   
    const { name, familiaProfesional, durada, asignatures } = props
    let token = localStorage.getItem('vToken');
    const bodySend = {
        "name": name,
        "familiaProfesional": familiaProfesional,
        "durada": durada,
        "asignatures": asignatures
    }
    console.log(bodySend);
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
        toast.success('Ciclo registrado  con éxito');
      } else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al registrar el ciclo');
      }
      
    
}