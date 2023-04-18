import React, { useTransition } from "react";
import axios from "axios";



export async function inscriureOferta(props){

    const { idOferta } = props;
    console.log(props)

    const url = `${import.meta.env.VITE_URL}/estudiante/oferta/inscribirse`;
    let token = localStorage.getItem('vToken')

    const sendBody = {
        idOferta: idOferta,
    }

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(sendBody),
    };
    console.log("put hecho")
    const response = await fetch(url, requestOptions)
    const data = await response.json();
    
}