import React, { useEffect, useState } from "react";
import { VerEmpresas } from "../services/app/infoEmpresa";
import '../App.css'
import '../assets/oferta.css'

export function GetEmpresaT() {
    let [empresa, setEmpresas] = useState([]);

    useEffect(() => {
        VerEmpresas().then(empresa => setEmpresas(empresa))
    }, [])

    let html;
    if (empresa.empresas && empresa.empresas.length > 0) {
        html =
            <>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5">EMPRESAS</h1>
                <div className="relative  sm:rounded-lg ml-80 my-4  ">



                    <table className="formEmpresa text-sm text-left   ">
                        <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                            <th scope="col" className="px-6 py-3">Nom</th>
                            <th scope="col" className="px-6 py-3">Direcció</th>
                            <th scope="col" className="px-6 py-3">Sector</th>
                        </thead>
                        <tbody>
                            {empresa.empresas.map(e =>
                                <tr className="bg-white border-2  border-blue-500  hover:bg-gray-200">
                                    <td key={empresa._id} classname="px-6 py-4">{e.nom}</td>
                                    <td key={empresa._id} className="px-6 py-4">{e.direccion}</td>
                                    <td key={empresa._id} className="px-6 py-4">{e.sector}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>


                </div>

                <div className="pagination">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setCurrentPage(currentPage - 1)}>
                        Prev
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setCurrentPage(currentPage + 1)}>
                        Next
                    </button>
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

    return html
}