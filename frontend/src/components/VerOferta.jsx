import React, { useEffect, useState } from "react";
import { VerOfertas } from "../services/ofertasList";
import { CardOferta } from "./cardOferta";
import '../App.css'
import '../assets/oferta.css'


export function GetOfertas() {

    let [ofertas, setOfertas] = useState([]);

    
    useEffect(() => {
        VerOfertas().then(ofertas => setOfertas(ofertas))
        console.log(ofertas)
    }, [])

    let html;
    if (ofertas.listaOfertas) {
        html =
            <>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 ">OFERTAS</h1>
                <div className="div-principal ">
                    {ofertas.listaOfertas.map(e =>
                        <CardOferta  key={e._id} data={e} />
                    )}
                </div>
            </>
    }
    else {
        html = (
            <>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
    console.log(ofertas);

    return html

}

