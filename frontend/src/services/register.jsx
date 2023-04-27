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
      toast.success(`Responsable registrat amb éxit`);
      console.log(data.role)
      console.log(data.token)
      setCookie('vToken',data.token, 1)
      setCookie('vRole',data.role, 1)
      location.reload()
    } 
    else if(response.status === 400 ){
      console.log('error 400')
      console.log(data.errors)
      toast.custom((t) => (
        <div className="border-2 text-red-500  bg-red-200 border-red-600 pl-2">
          <ul>
            {data.errors
              .filter((error, index, self) => self.findIndex((e) => e.msg === error.msg) === index) // Filtrar elementos duplicados
              .map((error, index) => (
                <li className="" key={index}>
                  {error.msg}
                </li>
              ))}
          </ul>
          <button onClick={() => toast.dismiss(t)}>close</button>
        </div>
      ));
    }
    else if (response.status >= 500 && response.status < 600) {
      toast.error('Ha ocorregut un error en el servidor');
    } else {
      toast.error(`Ha ocorregut un error al registrar el gestor`);
    }
 
  

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
      console.log(data.role)
      console.log(data.token)
      setCookie('vToken',data.token, 1)
      setCookie('vRole',data.role, 1)
      location.reload()
    } 
    else if(response.status === 400 ){
      console.log('error 400')
      console.log(data.errors)
      toast.custom((t) => (
        <div className="border-2 text-red-500  bg-red-200 border-red-600 pl-2">
          <ul>
            {data.errors
              .filter((error, index, self) => self.findIndex((e) => e.msg === error.msg) === index) // Filtrar elementos duplicados
              .map((error, index) => (
                <li className="" key={index}>
                  {error.msg}
                </li>
              ))}
          </ul>
          <button onClick={() => toast.dismiss(t)}>close</button>
        </div>
      ));
    }
    else if (response.status >= 500 && response.status < 600) {
      toast.error('Ha ocorregut un error en el servidor');
    } else {
      toast.error(`Ha ocorregut un error al registrar el responsable`);
    }
}

export async function RegisterAlumno(props) {
    const { name, email, password, cartaPresentacion, cvFile, link } = props

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("description", "lo quitaremos?");
    formData.append("passwordHash", password);
    formData.append("cartaPresentacion", cartaPresentacion);
    formData.append("curriculum", cvFile, cvFile.name);
    formData.append('link', link)
    console.log('aqdfaqfaq')
    console.log(formData)
    const requestOptions = {
        method: "POST",
        body: formData,
    };

    const response = await fetch(URL.urlEstudiante, requestOptions)
    const data = await response.json();



    if(data.id){
      setCookie('vID',data.id, 1)
    }
    if (response.status === 200) {
      toast.success(`Alumne registrat amb éxit`);
      console.log(data.role)
      console.log(data.token)
      setCookie('vToken',data.token, 1)
      setCookie('vRole',data.role, 1)
      location.reload()

    } 
    else if(response.status === 400 ){
      console.log('error 400')
      console.log(data.errors)
      toast.custom((t) => (
        <div className="border-2 text-red-500  bg-red-200 border-red-600 pl-2">
          <ul>
            {data.errors
              .filter((error, index, self) => self.findIndex((e) => e.msg === error.msg) === index) // Filtrar elementos duplicados
              .map((error, index) => (
                <li className="" key={index}>
                  {error.msg}
                </li>
              ))}
          </ul>
          <button onClick={() => toast.dismiss(t)}>close</button>
        </div>
      ));
    }
    else if (response.status >= 500 && response.status < 600) {

      toast.error('Ha ocorregut un error en el servidor');
    } else {
      toast.error(`Ha ocorregut un error al registrar el alumne`);
    }


}



