import React from 'react'
import '../assets/menu.css'

// import {Menu} from '../components/menu'
function Home() {

  return (
    <>
    {/* <Menu /> */}
     <h1 className='home'>BORSA DE TREBALL </h1>
     <h2 className='vidal'>INSTITUT VIDAL I BARRAQUER</h2>
    <div className='generalDiv'>
     <div className='infoEmpresa'>
      <b><h3>Informació per a les empreses</h3></b>
      <div className='listaH'>
        <b><p>Si voleu difondre una oferta de treball:</p></b>
      <li><a href='/register'>Registrat como a empresa</a></li>
      <li>Totes les ofertes les publicarem al tauler d'ofertes <br></br><a href="/getOfertas">Tauler d'ofertes</a></li>
      <li>Totes les candidatures que rebem les enviarem per correu electrònic a la persona de contacte de l’empresa.</li>
      {/* <div className='imgIns'>
        <img src="public\img\Institut Vidal i Barraquer.jpg" alt="" />
        </div> */}
      
      </div>
      </div>

     <div className='infoUser'>
       <b><h3>Informació per a l’alumnat i titulats de l’institut</h3></b>
        
       <div className='listaH'>
       <ul>
        <li><a href='/register'>Registart i no et perdis ninguna oferta</a></li>
        <li>Com pots accedir a les ofertes?<br></br><a href="/getOfertas">veure les ofertas</a></li>
       </ul><br />
       <b><p>Els col·lectius amb accés al servei de borsa de treball de l’Institut F. Vidal i Barraquer són:</p></b>
       <ul>
        <li>Estudiants amb matrícula  vigent a l'institut</li>
        <li>Titulats i titulades de l'institut</li>
       </ul><br />
       </div>
       </div>
     </div>
     <div className='imgH2'><h2>Algunes empreses que hi treballen amb nosaltres</h2></div>
     <div className='imagenes'>
      
      
      <div className='img-Inetum'>
      <a href="https://www.inetum.com/es"><img src="public\img\logo-inetum-social.jpg" alt="" /></a>
      </div>
      <div className='img-Inetum'>
      <a href="https://sotronic.com/"><img src="public\img\descarga.png" alt="" /></a>
      </div>
      <div className='img-Inetum'>
      <a href="https://ipsleon.com/"><img src="public\img\COSAS.png" alt="" /></a>
      </div>
      </div>
      
      
    </>
  )
}

export { Home }