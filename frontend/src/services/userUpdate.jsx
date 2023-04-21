import { getCookie } from "../context/cookies";


export async function editUser(props){
    
    
    const token = getCookie("vToken")
    const role = getCookie('vRole')
    let url;
    let user;
    let requestOptions;
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
        requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(user)
        };
    }

    if(role === 'alumno'){
        const {name, email, password, confirmpassword, cartaPresentacion, cvFile} = props
        console.log(props)
        url = `${import.meta.env.VITE_URL}/estudiante/actualizar`;
        const user = new FormData();
        user.append("name", name);
        user.append("email", email);
        user.append("description", "lo quitaremos?");
        user.append("passwordHash", password);
        user.append("cartaPresentacion", cartaPresentacion);
        user.append("curriculum", cvFile, cvFile.name);
        console.log(user)
        requestOptions = {
            method: "PUT",
            headers: {
                'Authorization': `${token}`
            },
            body: user,
        };
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
         requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(user)
        };
    }



    const response = await fetch(url, requestOptions)
    const data = response;
    
}