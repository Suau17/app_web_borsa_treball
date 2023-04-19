import React, { useTransition } from "react";
import axios from "axios";

const Url = `${import.meta.env.VITE_URL}/user/getUsers`;

export async function viewUsers(){

    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json,',
    'Authorization': `${token}`

},
    };

    const response = await fetch(Url, requestOptions);
    const data = await response.json();
    return data
 
}