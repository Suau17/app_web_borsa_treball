import React, { useTransition } from "react";
import axios from "axios";

const url = `${import.meta.env.VITE_URL}/estudiante/inscOferta`;

export async function inscriureOferta(props){

    let token = localStorage.getItem("vToken")

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