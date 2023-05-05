const url = `${import.meta.env.VITE_URL}/gestor/oferta/registrar`
import {  toast } from 'sonner'
import { getCookie } from '../../context/cookies'
export async function RegisterOferta(props) {
    const { title, description, requirements, skills, ciclo, dateOfPublication } = props
    let token = getCookie('vToken')
    const bodySend = {
        "title": title,
        "description": description,

        "requirements":requirements,

        "skills": skills,
        "ciclo": ciclo,
        "expirationDate":dateOfPublication
    }
    console.log(bodySend)
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
        toast.success('Oferta creada con éxito');
      } 
      else if(response.status === 400 ){
        console.log('error 400')
        console.log(data.errors)
        toast.custom((t) => (
          <div className="border-2 text-red-500  bg-red-200 border-red-600 pl-2">
            <ul className="max-w-md space-y-1 text-red-500 list-disc list-inside">
              {data.errors
                .filter((error, index, self) => self.findIndex((e) => e.msg === error.msg) === index) // Filtrar elementos duplicados
                .map((error, index) => (
                  <li className="" key={index}>
                    {error.msg}
                  </li>
                ))}
            </ul>
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => toast.dismiss(t)}>close</button>
          </div>
        ));
      }
      else if (response.status >= 500 && response.status < 600) {
        toast.error('Ha ocurrido un error en el servidor');
      } else {
        toast.error('Ha ocurrido un error al crear la oferta');
      }

}