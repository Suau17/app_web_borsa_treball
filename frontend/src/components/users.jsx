import React, {useEffect, useState} from "react";
import { viewUsers } from '../services/users'


export function GetUsers(){

    let [users, setUsers] = useState([]);

    //Cuando la variable '[]' cambie, entonces se ejecuta el useEffect
    useEffect(() => {
        viewUsers().then(user => setUsers(user))
    }, [])

    let view;

    if(users.listaUsuarios){
        console.log(users.listaUsuarios)

        view = (
            <>

            {users.listaUsuarios.map(e => 
                <div className = "users">
                    { e.name }
                </div>
            )}
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