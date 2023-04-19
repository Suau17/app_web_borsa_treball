import React, { useEffect, useState } from "react";
import { VerEmpresas } from "../services/infoEmpresa";
import '../App.css'
import '../assets/oferta.css'

export function GetEmpresaT(){
    let [empresa, setEmpresas] = useState([]);

    useEffect(() => {
        VerEmpresas().then(empresa => setEmpresas(empresa))
        console.log(empresa)
    }, [])

    let html;
    if(empresa.length > 0){
        html=
        <>
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5">EMPRESAS</h1>
        {console.log('calcaca')}
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ml-80 my-4 w-2/3 ">
            
            

              <table className="w-full text-sm text-left   ">
                <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                    <th scope="col" class="px-6 py-3">Nom</th>
                    <th scope="col" class="px-6 py-3">Direccion</th>
                    <th scope="col" class="px-6 py-3">Sector</th>
                </thead>
                <tbody>
                { empresa.map(e =>
                    <tr className="bg-white border-2  border-blue-500  hover:bg-gray-200">
                        <td key={empresa._id} class="px-6 py-4">{e.nom}</td>
                        <td key={empresa._id} class="px-6 py-4">{e.direccion}</td>
                        <td key={empresa._id} class="px-6 py-4">{e.sector}</td>
                    </tr>
                    )} 
                </tbody>
              </table>




            
           

            </div>
        </>
    }
    else{
        html = (
           <>
           <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
           </>
       )
   }
 console.log(empresa);

   return html
}