import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom'
import { VerOfertas } from "../services/ofertasList";
import { GetInscripciones } from "../services/inscripciones";

export function Inscripciones() {

    const [ ofertas, setOfertas ] = useState([])

    useEffect(() => {
        VerOfertas().then(ofertas => setOfertas(ofertas));
    }, [])

    let html = '';

    if (ofertas.length >= 1) {
        html = (
            <>
                <div>
                    <table>
                        <thead>
                            <th>Título</th>
                            <th>Descripción</th>
                            <th>Requisitos</th>
                            <th>Skills</th>
                            <th>Ciclo</th>
                            <th>Fecha de publicación</th>
                        </thead>
                        <tbody>
                            {ofertas.listaOfertas.map(e =>
                                <tr>
                                    <td key = { ofertas._id}>{e.title}</td>
                                    <td key = { ofertas._id}>{e.descirption}</td>
                                    <td key = { ofertas._id}>{e.requeriments}</td>
                                    <td key = { ofertas._id}>{e.skills}</td>
                                    <td key = { ofertas._id}>{e.ciclo}</td>
                                    <td key = { ofertas._id}>{e.dateOfPublication}</td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    else {
        html = (
            <>
                <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }

    return html
 
}