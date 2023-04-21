import { GetProfile } from "../services/getProfile";
import { editUser } from '../services/alumne/alumneupdate'
import { useState, useEffect } from "react";
import '../assets/perfil.css'
export  function Profile() {
    let [profile, setProfile] = useState([])
    const [activeForm,setActiveForm] = useState("perfil");

    const handlePerfil = () => {
        setActiveForm("perfil")
    }

    const handleFormEdit = () =>{
        setActiveForm("edit")
    }

    useEffect(() =>{},[activeForm]);

    function handleClickPerfil(event){
        event.preventDefault()
    const perfil = Object.fromEntries(
      new window.FormData(event.target)
    )
    editUser(perfil)
    }

    function handleClickEdit(event){
        event.preventDefault()
        const edit = Object.fromEntries(
          new window.FormData(event.target)
        )
        GetProfile(edit)
    }


    useEffect(() => {
        GetProfile().then(profile => setProfile(profile))       
    }, [])
    function handleClickAlumne(){
        event.preventDefault();
        const alumne = Object.fromEntries(
            new window.FormData(event.target)
        )
        editUser(alumne)
    }
   
   
   
   
   
   
    console.log('PROFILEEE')
    console.log(profile)
    
    
    
    
    
    
    
    let html;
    if(profile.user){
        console.log(profile)
         html = (
            <>
            {/* <h1 class="">Informacion del Usuario</h1> */}
            <div className={activeForm === 'perfil' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
            <div className="card">
            <div className="img">
                <img src="public\img\usuario.png" alt="" />
            </div>
            <div className="content">
            
                <h2>Nom:{profile.user.name}</h2><br></br>
                
                
                <div className="center">
                    <div className="box">
                    <span className=" " >Email: {profile.user.email}</span>
                    </div>
                    <div className="box">
                    <span className=" " >Rol: {profile.user.rolUser}</span>
                    </div>
                </div>
                    <button onClick={handleFormEdit} className="btn">Editar</button>
                </div>
                </div>
                </div>
                {/* probar a hacer boton para editar usuario dentro de la carta */}

                <div className=" perfUser ">
        <div className={activeForm === 'edit' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
        <button onClick={handlePerfil} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Perfil</button>
        <form onSubmit = { handleClickAlumne } id="editarAlumne" className="bg-white shadow-md rounded px-8 pt-10 pb-8 mb-4 text-lg ">
        <h1 className="block text-gray-700 text-xl font-bold ">Edita la informació d'usuari</h1>
            <span  className="block text-gray-700  font-bold mb-2">Nom</span>
            <input type = "text" name = "name" defaultValue={profile.user.name} placeholder="Entra el teu nou nom d'usuari" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <span className="block text-gray-700  font-bold mb-2">email</span>
            <input type = "text" name = "email" defaultValue={profile.user.email}  placeholder = "Entra el teu nou mail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <span className="block text-gray-700  font-bold mb-2">password</span>
            <input type = "password" name = "password"  placeholder = "Entra la nova contrassenya" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <span className="block text-gray-700  font-bold mb-2">confirma la contraseña</span>
            <input type = "password" name = "confirmpassword" placeholder = "Confirma la teva contrassenya" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            {profile.user.rolUser === "gestor" ? (
                                <div>
                                    <span className="block text-gray-700  font-bold mb-2" >Carrec</span>
                                    <input type="text" name='cargo' placeholder='carrec a la empresa (ex : responsable IT)' defaultValue={profile.user.cargo} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <span className="block text-gray-700  font-bold mb-2">telefon</span>
                                    <input type="text" name='telefon' placeholder='telefon' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            ) : (
                                <div>

                                </div>
                            )}

                            {profile.user.rolUser === "alumno" ? (
                                <div>
                                    <textarea name="cartaPresentacion" placeholder='hola me llamo xxxx y ....'
                                        id="" cols="45" rows="6" className='textAreaCV shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'  >
                                    </textarea>
                                    <i>curriculum (img o pdf):</i>
                                    <input type="file" name='cvFile' accept="image/*,.pdf" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                </div>
                            ) : (
                                <div>

                                </div>
                            )

                            }

                            {profile.user.rolUser === "admin" ? (
                                <div>
                                   <span className="block text-gray-700  font-bold mb-2">Carrec</span>
                                    <input type="text" name='cargo' placeholder='carrec a la empresa (ex : responsable IT)' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <span className="block text-gray-700  font-bold mb-2">telefon</span>
                                    <input type="text" name='telefon' placeholder='telefon' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <span className="block text-gray-700  font-bold mb-2">Dni</span>
                                    <input type="text" name='telefon' placeholder='DNI' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />

                                </div>
                            ) : (
                                <div>

                                </div>
                            )

                            }
            <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
        </form>
        </div>
        </div>

            </>
        )
    } else {
         html = (
            <>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
    return html
}
