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
     <div className='infoEmpresa'><p>aosdpaodjap</p></div>
     <div className='infoUser'>
       <h3>Estudiantes</h3>
       <p><a href='/register'>Registrate y no te pieras ninguna oferta</a> </p>
       <p><a href="/getOfertas">ver las ofertas</a></p>
       </div>
     </div>

     <div className='imagenes'>imagenes empresas</div>
      
    </>
  )
}

export { Home }