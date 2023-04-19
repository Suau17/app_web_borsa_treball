const Url = `${import.meta.env.VITE_URL}/app/getEmpresa`

export async function VerEmpresas(){

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${token}`
     },
        
    };

        const response = await fetch(Url,requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
        
}