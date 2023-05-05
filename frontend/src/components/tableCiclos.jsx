import React, { useEffect, useState } from "react";
import { getCiclos } from "../services/app/ciclos";

export function CicloT(){
    let [estudios, setEstudios] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getCiclos(currentPage).then(estudios => setEstudios(estudios))
    }, [])

    let html;
    
    if(estudios){
        {console.log('adsadsad')}
        html = 
        <>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 ">Estudios </h1>
            <div className="relative  sm:rounded-lg ml-80 my-4  ">
              <table className=" formEmpresa text-sm text-left text-black-500 dark:text-black-400   ">
                <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                  <th scope="col" className="px-6 py-3">Nom</th>
                  <th scope="col" className="px-6 py-3">Familia Profesional</th>
                  <th scope="col" className="px-6 py-3">Durada</th>
                  <th scope="col" className="px-6 py-3">Assignatures</th>
                  
                </thead>
                <tbody>
                {estudios.map(e =>
                
                <tr  className="bg-white border-2 border-blue-500  hover:bg-gray-200">
                 
                  <td key={estudios._id} className="px-6 py-4">{e.name}</td>
                  <td key={estudios._id} className="px-6 py-4">{e.familiaProfesional}</td>
                  <td key={estudios._id} className="px-6 py-4">{e.durada}</td>
                  <td key={estudios._id} className="px-6 py-4">{e.asignatures}</td>
                  
                  
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
    else{
        html = (
           <>
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
           </>
       )
   }

   return html
}