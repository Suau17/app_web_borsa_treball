import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
    console.log('mi puta vida')
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodySend)
    };
    const response = await fetch(url, requestOptions)
    const data = await response.json();
    console.log(response)
    console.log(data)

    localStorage.setItem('vToken', data.token)
    localStorage.setItem('vRole', data.role)
    location.reload()
    
}

export function Logout() {
    const navigate = useNavigate();
  
    useEffect(() => {
      localStorage.removeItem('vToken');
      localStorage.removeItem('vRole');
      navigate('/');
      location.reload()
    }, []);
  
    return null;
  }