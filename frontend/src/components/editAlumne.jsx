import react, { useEffect, useState } from "react";
import { editUser } from '../services/alumne/alumneupdate'
import '../assets/perfil.css'
export function FormEditAlumne() {

    function handleClickAlumne(){
        event.preventDefault();
        const alumne = Object.fromEntries(
            new window.FormData(event.target)
        )
        editUser(alumne)
    }

    return (
        <>
        <div></div>
        <div className=" perfUser ">
        
        <form onSubmit = { handleClickAlumne } id="editarAlumne" className="bg-white shadow-md rounded px-8 pt-10 pb-8 mb-4 text-lg ">
        <h1 className="block text-gray-700 text-xl font-bold ">Edita la informació d'usuari</h1>
            <span className="block text-gray-700  font-bold mb-2">Nom</span>
            <input type = "text" name = "name" placeholder="Entra el teu nou nom d'usuari" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <span className="block text-gray-700  font-bold mb-2">email</span>
            <input type = "text" name = "email" placeholder = "Entra el teu nou mail" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <span className="block text-gray-700  font-bold mb-2">password</span>
            <input type = "password" name = "password" placeholder = "Entra la nova contrassenya" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <span className="block text-gray-700  font-bold mb-2">confirma la contraseña</span>
            <input type = "password" name = "confirmpassword" placeholder = "Confirma la teva contrassenya" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
        </form>
        </div>
        </>
    )
}