import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setCookie, removeCookie, getCookie } from '../context/cookies';
const url = `${import.meta.env.VITE_URL}/user/login`;

export async function LoginApi(props) {
    console.log(props.email)
    const email = props.email
    const password = props.password
    const bodySend = {
        "email": email,
        "password": password
    }
    console.log(bodySend)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodySend)
    };
    const response = await fetch(url, requestOptions)
    const data = await response.json();
    console.log(response)
    console.log(data)

    setCookie('vToken', data.token, 1)
    setCookie('vRole', data.role, 1)
    setCookie('vID', data.id, 1)
    location.reload()
}

export function Logout() {
    const navigate = useNavigate();
  
    useEffect(() => {
      removeCookie('vToken')
      removeCookie('vRole')
      if(getCookie('vID')){
        removeCookie('vID')
      }
      navigate('/');
      location.reload()
    }, []);
  
    return null;
  }