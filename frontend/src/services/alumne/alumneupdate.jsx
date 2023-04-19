import React, { useTransition } from "react";
import axios from "axios";

const url = `${import.meta.env.VITE_URL}/user/actualizar/`;

export async function editUser(props){

    const {name, email, password, confirmpassword} = props
    let token = localStorage.getItem("vToken")
    const user = {
        name: name,
        email: email,
        password: password,
        
    }

    console.log(user)

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