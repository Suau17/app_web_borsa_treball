

export async function editUser(props){
    
    
    const token = localStorage.getItem("vToken")
    const role = localStorage.getItem('vRole')
    let url;
    let user;
    if(role === 'gestor' || role === 'responsable'){
        const {name, email, password, confirmpassword, cargo, telefon} = props
        url = `${import.meta.env.VITE_URL}/user/actualizar/`;
        user = {
            name: name,
            email: email,
            password: password,
            confirmpassword : confirmpassword,
            cargo : cargo,
            telefon : telefon
        }
        
    }
    if(role === 'alumno'){
        const {name, email, password, confirmpassword, cargo, telefon, dni} = props
        url = `${import.meta.env.VITE_URL}/user/actualizar/`;
        user = {
            name: name,
            email: email,
            password: password,
            confirmpassword : confirmpassword,
            cargo : cargo,
            telefon : telefon,
            dni : dni
        }
    }
    if(role === 'admin'){
        const {name, email, password, confirmpassword, cargo, telefon, dni} = props
        console.log(props)
        url = `${import.meta.env.VITE_URL}/admin/update`;
        user = {
            name: name,
            email: email,
            password: password,
            confirmpassword : confirmpassword,
            cargo : cargo,
            telefon : telefon,
            dni : dni
        }
        console.log(user)
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