import { getCookie } from "../context/cookies";
import { toast } from "sonner"


export async function editUser(props){
    
    
    const token = getCookie("vToken")
    const role = getCookie('vRole')
    let url;
    let user;
    let requestOptions;
    if(role === 'gestor' || role === 'responsable'){
<<<<<<< HEAD
        const {name, email, password, confirmpassword, carrec, telefon} = props
=======
        const {name, email, password, confirmpassword, cargo, telefon} = props
>>>>>>> 8ba915c6d091e6188703f631ce03bf1cef0b7694
        url = `${import.meta.env.VITE_URL}/gestor/update/`;
        user = {
            name: name,
            email: email,
            password: password,
            confirmpassword : confirmpassword,
            carrec : carrec,
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
        const {name, email, password, confirmpassword,link, cartaPresentacion, cvFile} = props
        console.log(props)
        url = `${import.meta.env.VITE_URL}/estudiante/actualizar`;
        const user = new FormData();
        user.append("name", name);
        user.append("email", email);
        user.append("description", "lo quitaremos?");
        user.append("passwordHash", password);
        user.append("cartaPresentacion", cartaPresentacion);
        user.append("curriculum", cvFile);
        user.append('link', link)
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
    const data = await response.json();
    if (response.status === 200) {
        toast.success(`Empresa actualitzada amb éxit`);
      
      
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
        toast.error('Ha ocorregut un error en el servidor');
      } else {
        toast.error(`Ha ocorregut un error al actualitzar l'oferta`);
      }
    console.log(response)
    
}