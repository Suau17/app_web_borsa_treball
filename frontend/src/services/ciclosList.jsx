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

    const data = await response.json();
    
    if (response.status === 200) {
        toast.success('Ciclo registrado  con éxito');
      } 
      else if(response.status === 400 ){
        console.log('error 400')
        console.log(data.errors)
        toast.custom((t) => (
          <div className="border-2 text-red-500  bg-red-200 border-red-600 pl-2">
            <ul>
              {data.errors
                .filter((error, index, self) => self.findIndex((e) => e.msg === error.msg) === index) // Filtrar elementos duplicados
                .map((error, index) => (
                  <li className="" key={index}>
                    {error.msg}
                  </li>
                ))}
            </ul>
            <button onClick={() => toast.dismiss(t)}>close</button>
          </div>
        ));
      }
      else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al registrar el ciclo');
      }
      
    
}