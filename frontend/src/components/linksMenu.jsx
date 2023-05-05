import { Logout } from '../services/app/login'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

export function linksGestor() {


    return (<>
        <li><Link to="/getOfertas">Ofertes</Link></li>
        <li><Link to="/empleados">Empleats</Link></li>
        <li><Link to="/empresa">Empresa</Link></li>
        <li><Link to="/User">Perfil d'usuari</Link></li>
        <li><a href="/logout">Logout</a></li>
 
    </>
    )
}
export function linksResponsable() {


    return (<>
        <li><Link to="/getOfertas">Ofertes</Link></li>
        <li><Link to="/empresa">Empresa</Link></li>
        <li><Link to="/User">Perfil d'usuari</Link></li>
        <li><a href="/logout">Logout</a></li>
 
    </>
    )
}
export function linksAlumne() {
    
    return (
    <>
        <li><Link to="/getOfertas">Ofertes</Link></li>
        <li><a href="/inscripciones"  className='active'>Inscripcions</a></li>
        <li><Link to="/user">Perfil d'usuari</Link></li>
        {/* <li><a href = "/editAlumne" className='active'>Edit</a></li> */}
        <li><a href="/logout"  className='active'>Logout</a></li>
    </>
    )
}

export function linksAdmin(){
    return(
    <>
    <li><Link to="/stats">Estadístiques</Link></li>
    <li><Link to="/users">Usuaris</Link></li>
    <li><Link to="/TableEmpresa">Empresa</Link></li>
    <li><Link to="/tableOfertas">Ofertes</Link></li>
    <li><Link to="/crearCiclos">Registar cicle</Link></li>
    <li><Link to="/tableCiclo">Cicles</Link></li>
    <li><Link to="/User">Perfil d'usuari</Link></li>
    <li><a href="/logout">Logout</a></li>
    
    </>)
   
}