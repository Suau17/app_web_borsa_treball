const Url = `${import.meta.env.VITE_URL}/admin/deleteUser`


export async function deleteUser(props){
    console.log(props)
    const {id} = props;
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
        
    };

        const response = await fetch(Url,requestOptions);
        const data = await response.json();
        console.log(data)
        location.reload();
        return data;
        
}
