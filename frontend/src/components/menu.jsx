import '../App.css'
import '../assets/menu.css'
import { linksGestor, linksResponsable } from './linksMenu'
import { linksAlumne } from './linksMenu'
import { linksAdmin } from './linksMenu'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export function Menu() {

    let token = localStorage.getItem('vToken')
    let role = localStorage.getItem('vRole')

    function validarRol(role) {
        console.log(role)
        if(role == 'gestor'){
            console.log('dasfasf')
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

                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link> </li> 
                    <li><Link to="/getOfertas">Ofertas</Link></li>
                        <li><Link to="/registerOferta"></Link></li>
                    
                    {/* <li><Link to="/users">Users</Link></li> */}
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
