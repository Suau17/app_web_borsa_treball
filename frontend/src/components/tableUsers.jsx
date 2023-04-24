import React, { useEffect, useState, useCallback } from "react";
import { viewUsers } from '../services/users'
import { deleteUser } from '../services/deleteUser'
import { habilitarGestores } from "../services/habilitarGestores";
import '../assets/oferta.css'

export function GetUsers() {

    let [users, setUsers] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);


    // Cuando la variable '[]' cambie, entonces se ejecuta el useEffect
    useEffect(() => {
        viewUsers(currentPage).then(user => setUsers(user))
    }, [currentPage])


    function miFuncion() {
        // Aquí va el código que realiza la función del botón
      
        // Deshabilita el botón
        document.getElementById("btn").disabled = true;
      }

    const habilitarGestoresCallback = useCallback((id) => {
        habilitarGestores({ id });
    }, [users]);

    const deleteUserCallback = useCallback((id) => {

        deleteUser({ id }).then(() =>
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user._id !== id)
            )
        )
    }, [setUsers]
    );



    let view;

    if (users.listaUsuarios) {
        console.log(users.listaUsuarios)

        view = (
            <>


                <h1 className=" ml-80 mr-80 text-4xl font-extrabold font-serif leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 sm:rounded-lg">USUARIOS</h1>
                <div className=" usuarios relative   sm:rounded-lg  my-4  text-4xl">

                    <table className="formUser text-sm text-left    ">
                        <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                            <th scope="col" className="px-6 py-3">Nombre</th>
                            <th scope="col" className="px-6 py-3">Gmail</th>
                            <th scope="col" className="px-6 py-3">Rol</th>
                            <th scope="col" className="px-6 py-3">Operaciones</th>
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


                                            <button  name="btn"  className=" bg-blue-500 text-white font-semibold  py-2 px-4 border border-blue-500 rounded " onClick={() => {console.log(e), habilitarGestores({ id: e._id }),miFuncion() }}  >Habilitar </button>

                                            <button name="btn" className=" bg-blue-500 text-white font-semibold  py-2 px-4 border border-blue-500 rounded " onClick={() => { console.log(e), habilitarGestoresCallback(e._id) }} >Habilitar </button>


                                        }

                                        {console.log(e._id)}
                                        <button className=" bg-red-500 text-white font-semibold  py-2 px-4 border border-red-500 rounded ml-3" onClick={() => { deleteUserCallback(e._id) }}>Eliminar</button></td>
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

    } else {
        view = (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }

    return view


} 
