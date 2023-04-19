import React, { useEffect, useState } from 'react';
import { inscriureOferta } from '../services/alumne/inscriureOferta'; 
import '../assets/register.css'

export function ButtonInscriureOferta(props){
    const [inscrito, setInscrito] = useState(false);
    
    const { idOferta } = props;
    const handleClickOferta = () => {
        console.log("Button Inscriure Oferta "+ idOferta)
        inscriureOferta({idOferta: idOferta})
        setInscrito(true);
    }

    return(
        <>
            <div>
                <button onClick={handleClickOferta}>
                    {inscrito ? "Inscrito" : "Inscribirse"}
                </button>
            </div>
        </>
    )
}
