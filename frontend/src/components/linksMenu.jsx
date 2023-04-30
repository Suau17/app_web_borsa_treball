import { Logout } from '../services/app/login'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export function linksGestor() {


    return (<>
        <li><Link to="/getOfertas">Ofertas</Link></li>
        <li><Link to="/empleados">Empleados</Link></li>
        <li><Link to="/empresa">Empresa</Link></li>
        <li><Link to="/User">User Profile</Link></li>
        <li><a href="/logout">Logout</a></li>
 
    </>
    )
}
export function linksResponsable() {


    return (<>
        <li><Link to="/getOfertas">Ofertas</Link></li>
        <li><Link to="/empresa">Empresa</Link></li>
        <li><Link to="/User">User Profile</Link></li>
        <li><a href="/logout">Logout</a></li>
 
    </>
    )
}
export function linksAlumne() {
    
    return (
    <>
        <li><Link to="/getOfertas">Ofertas</Link></li>
        <li><a href="/inscripciones"  className='active'>inscripciones</a></li>
        <li><Link to="/user">Profile</Link></li>
        {/* <li><a href = "/editAlumne" className='active'>Edit</a></li> */}
        <li><a href="/logout"  className='active'>Logout</a></li>
    </>
    )
}

export function linksAdmin(){
    return(
    <>
    <li><Link to="/stats">Stats</Link></li>
    <li><Link to="/users">Users</Link></li>
    <li><Link to="/TableEmpresa">Empresa</Link></li>
    <li><Link to="/tableOfertas">Ofertas</Link></li>
    <li><Link to="/crearCiclos">Registar ciclo</Link></li>
    <li><Link to="/tableCiclo">Ciclos</Link></li>
    <li><Link to="/User">User Profile</Link></li>
    <li><a href="/logout">Logout</a></li>
    
    </>)
   
}