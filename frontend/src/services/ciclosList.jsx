const url = `${import.meta.env.VITE_URL}/admin/ciclo/register`;
export async function RegisterCiclo(props){
   
    const {name, familiaProfesional, durada, asignatures} = props

    const bodySend = {
        "name": name,
        "familiaProfesional":familiaProfesional,
        "durada":durada,
        "asignatures":asignatures
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodySend)
    };

    const response = await fetch(url, requestOptions)
    const data = await response.json()
    return data;
}