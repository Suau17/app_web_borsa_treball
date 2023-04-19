import React, {useEffect, useState} from "react";
import { viewUsers } from '../services/users'

import { deleteUser } from '../services/deleteUser'
import { habilitarGestores } from "../services/habilitarGestores";
import '../assets/oferta.css'





export function GetUsers(){

    let [users, setUsers] = useState([]);
    
    //Cuando la variable '[]' cambie, entonces se ejecuta el useEffect
    useEffect(() => {
        viewUsers().then(user => setUsers(user))
    }, [])

    const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  // Cuando la variable '[]' cambie, entonces se ejecuta el useEffect
  useEffect(() => {
    viewUsers().then(user => setUsers(user))
  }, [])

  // Obtener el índice del último usuario de la página actual
  const indexOfLastUser = currentPage * usersPerPage;
  // Obtener el índice del primer usuario de la página actual
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Obtener los usuarios para la página actual
  const currentUsers = users.listaUsuarios ? users.listaUsuarios.slice(indexOfFirstUser, indexOfLastUser) : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

    let view;

    if(users.listaUsuarios){
        console.log(users.listaUsuarios)

        view = (
            <>
                
                <h1 className=" ml-80 mr-80 text-4xl font-extrabold font-serif leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 sm:rounded-lg">USUARIOS</h1>
                <div className="users relative overflow-x-auto shadow-md sm:rounded-lg ml-80 my-4 w-2/3 text-4xl">
               
                    <table className="w-full text-sm text-left    ">
                        <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                            <th scope="col" class="px-6 py-3">Nombre</th>
                            <th scope="col" class="px-6 py-3">Gmail</th>
                            <th scope="col" class="px-6 py-3">Rol</th>
                            <th scope="col" class="px-6 py-3">Operaciones</th>
                        </thead>
                        <tbody>

                            {users.listaUsuarios.map(e =>

                                <tr key={e._id} className="bg-white border-2 border-blue-500  hover:bg-gray-200">
                                    <td className="px-6 py-4">{e.name}</td>
                                    <td className="px-6 py-4">{e.email}</td>
                                    <td className="px-6 py-4">{e.rolUser}</td>
                                    {console.log(users)}
                                    <td className="px-6 py-4">

                                        {e.rolUser === "gestor" && // Only render the button if role is "gestor"

                                            <button name="btn" className=" bg-blue-500 text-white font-semibold  py-2 px-4 border border-blue-500 rounded " onClick={() => {console.log(e), habilitarGestores({ id: e._id }) }} >Habilitar </button>

                                        }

                                        {console.log(e._id)}
                                        <button className=" bg-red-500 text-white font-semibold  py-2 px-4 border border-red-500 rounded ml-3" onClick={() => { deleteUser({ id: e._id }) }}>Eliminar</button></td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                   
                </div>

                <div className="pagination">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        Prev
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>

                </div>
            
            </>
        )
        
    } else{
        view = (
            <>
               <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }

    return view
   
        
} 
