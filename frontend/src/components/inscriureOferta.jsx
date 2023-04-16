import React, { useEffect, useState } from 'react';
import { inscriureOferta } from '../services/alumne/inscriureOferta'; 
import '../assets/register.css'

export function ButtonInscriureOferta(){
    
    function handleClickOferta(event) {
        event.preventDefault()
        const oferta = Object.fromEntries(
          new window.FormData(event.target)
        )
        inscriureOferta(oferta)
      }
    

    return(
        <>
            <form onSubmit={handleClickOferta}  id="ofertaR">
                <button>Inscriure's</button>
            </form>
        </>
    )
}
