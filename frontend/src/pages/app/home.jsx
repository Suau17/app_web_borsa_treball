import React from 'react'
import '../../assets/menu.css'

// import {Menu} from '../components/menu'
function Home() {

  return (
    <>
    {/* <Menu /> */}
     <h1 className='home'>BORSA DE TREBALL </h1>
     <h2 className='vidal'>INSTITUT VIDAL I BARRAQUER</h2>
    <div className='generalDiv'>
     <div className='infoEmpresa'><p>Empreses</p></div>
     <div className='infoUser'>
       <h3>Estudiantes</h3>
       <p><a href='/register'>Registra't i no et perdis cap oferta</a> </p>
       <p><a href="/getOfertas">ver las ofertas</a></p>
       </div>
     </div>

     <div className='imagenes'>
      <div className='img-Inetum'>
      <img src="public\img\logo-inetum-social.jpg" alt="" />
      </div>
      <div className='img-Inetum'>
      <img src="public\img\logo-inetum-social.jpg" alt="" />
      </div>
      <div className='img-Inetum'>
      <img src="public\img\logo-inetum-social.jpg" alt="" />
      </div>
      </div>
      
    </>
  )
}

export { Home }