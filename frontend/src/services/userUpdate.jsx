

export async function editUser(props){
    
    
    const token = localStorage.getItem("vToken")
    const role = localStorage.getItem('vRole')
    let url;
    let user;
    if(role === 'gestor' || role === 'responsable'){
        url = `${import.meta.env.VITE_URL}/user/actualizar/`;
    }
    if(role === 'alumno'){
        url = `${import.meta.env.VITE_URL}/user/actualizar/`;
    }
    if(role === 'admin'){
        const {name, email, password} = props
        url = `${import.meta.env.VITE_URL}/admin/update`;
        user = {
            name: name,
            email: email,
            password: password,
        }
    }



    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(user)
    };

    const response = await fetch(url, requestOptions)
    const data = response;
    
}