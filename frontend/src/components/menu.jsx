import '../App.css'
import '../assets/menu.css'
import { getCookie } from '../context/cookies'
import { linksGestor, linksResponsable } from './linksMenu'
import { linksAlumne } from './linksMenu'
import { linksAdmin } from './linksMenu'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export function Menu() {


    let token = getCookie('vToken')
    let role = getCookie('vRole')

    function validarRol(role) {
        console.log(role)
        if(role == 'gestor'){
          return  linksGestor()
        }
        if(role == 'alumno'){
         return   linksAlumne()
        }

        if(role == 'admin'){
            return   linksAdmin()
           }
        if(role == 'responsable'){
            return linksResponsable()
        }
    }
    let noLogged = <>
        <header>
            
            <div className="logo">
            
                <a href="/" className='active'>
                    <img src="public\img\logo.webp" alt="" />
                </a>
            </div>
          
            <nav id='menu'>
                <ul>

                    <li><Link to="/getOfertas">Ofertes</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link> </li> 
                    
                </ul>
            </nav>
        </header>

    </>

    let isLogged = <>
        <header>
            <div className="logo">
                <a href="/" className='active'>
                    <img src="public\img\logo.webp" alt="" />
                    
                </a>
                
            </div>
            <nav id='menu'>
            
                <ul>
                    {
                        validarRol(role)
                    }
                
                </ul>
            </nav>
        </header>
    </>


    if (token) {
        return isLogged
    }
    if (!token) {
        return noLogged
    }


}
