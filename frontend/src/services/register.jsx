import React, { useTransition } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { toast } from "sonner";
import { getCookie, setCookie } from "../context/cookies";
const URL = {
    urlGestor: `${import.meta.env.VITE_URL}/user/register/gestor`,
    urlEstudiante: `${import.meta.env.VITE_URL}/user/register/estudiante`,
    urlResponsable: `${import.meta.env.VITE_URL}/gestor/register/responsable`
}


export async function RegisterGestor(props) {
    console.log(props)
    const { name, email, password, cargo, telefon, empresa, direction, sector } = props

    const bodySend = {
        "name": name,
        "email": email,
        "description": "lo quitaremos?",
        "passwordHash": password,
        "carrec": cargo,
        "telefon": telefon,
        "nameEmpresa": empresa,
        "direccion": direction,
        "sector": sector
    }

    console.log(bodySend)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodySend)
    };

    const response = await fetch(URL.urlGestor, requestOptions)
    const data = await response.json();
    console.log(data)
    if (response.status === 200) {
      toast.success(`Gestor registrat amb éxit`);
    } else if (response.status >= 500 && response.status < 600) {
      toast.error('Ha ocorregut un error en el servidor');
    } else {
      toast.error(`Ha ocorregut un error al registrar el gestor`);
    }
 
    setCookie('vToken', data.token, 1)
    setCookie('vRole', data.role, 1)
    location.reload()

}

export async function RegisterResponsable(props) {
    const { name, email, password, cargo, telefon} = props
    let token = getCookie('vToken')
    const bodySend = {
        "name": name,
        "email": email,
        "description": "lo quitaremos?",
        "passwordHash": password,
        "carrec": cargo,
        "telefon": telefon,
    }

    console.log(bodySend)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(bodySend)
    };

    const response = await fetch(URL.urlResponsable, requestOptions)
    const data = await response.json();
    console.log(data)

    if (response.status === 200) {
      toast.success(`Responsable registrat amb éxit`);
    } else if (response.status >= 500 && response.status < 600) {
      toast.error('Ha ocorregut un error en el servidor');
    } else {
      toast.error(`Ha ocorregut un error al registrar el responsable`);
    }
}

export async function RegisterAlumno(props) {
    const { name, email, password, cartaPresentacion, cvFile } = props

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", "lo quitaremos?");
    formData.append("passwordHash", password);
    formData.append("cartaPresentacion", cartaPresentacion);
    formData.append("curriculum", cvFile, cvFile.name);
    console.log('aqdfaqfaq')
    console.log(formData)
    const requestOptions = {
        method: "POST",
        body: formData,
    };

    const response = await fetch(URL.urlEstudiante, requestOptions)
    const data = await response.json();
    console.log(data.role)
    console.log(data.token)
    setCookie('vToken',data.token, 1)
    setCookie('vRole',data.role, 1)


    if(data.id){
      setCookie('vID',data.id, 1)
    }
    if (response.status === 200) {
      toast.success(`Alumne registrat amb éxit`);
    } else if (response.status >= 500 && response.status < 600) {
      toast.error('Ha ocorregut un error en el servidor');
    } else {
      toast.error(`Ha ocorregut un error al registrar el alumne`);
    }
    location.reload()

}



