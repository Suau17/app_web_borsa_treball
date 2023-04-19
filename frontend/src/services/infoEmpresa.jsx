const Url = `${import.meta.env.VITE_URL}/app/getEmpresa`

export async function VerEmpresas(){

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': `${token}`
     },
        
    };

    // fetch(Url, requestOptions)
        // .then(response=>(console.log(response)))
        // .then(data => data)
        // .catch(error=>console.log(error));
        const response = await fetch(Url,requestOptions);
        const data = await response.json();
        console.log(data)
        return data;
        
}