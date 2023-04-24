import React, { useEffect, useState } from "react";
import { VerOfertas } from "../services/ofertasList";
import '../App.css'
import '../assets/oferta.css'


export function OfertasT() {
    
    let [ofertas, setOfertas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        VerOfertas(currentPage).then(ofertas => setOfertas(ofertas))
    }, [])

    const removeOf = () => {
        // "current" contains the latest state array
        setFruits((current) =>
          current.filter((oferta) => oferta.id )
        );
      };

    let html;
    if(ofertas.listaOfertas){               
       
         //llamar listar oferta
         html = 
            <>
            
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-black mt-5 ">OFERTAS </h1>
            <div className="relative  sm:rounded-lg ml-80 my-4  ">
              <table className=" formEmpresa text-sm text-left text-black-500 dark:text-black-400   ">
                <thead className="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                  <th scope="col" className="px-6 py-3">Titulo</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Requeriments</th>
                  <th scope="col" className="px-6 py-3">Skills</th>
                  <th scope="col" className="px-6 py-3">Ciclo</th>
                  <th scope="col" className="px-6 py-3">Fecha de publicacion</th>
                </thead>
                <tbody>
                { ofertas.listaOfertas.map(e =>
                <tr  className="bg-white border-2 border-blue-500  hover:bg-gray-200">
                  <td key={ofertas._id} className="px-6 py-4">{e.title}</td>
                  <td key={ofertas._id} className="px-6 py-4">{e.description}</td>
                  <td key={ofertas._id} className="px-6 py-4">{e.requeriments}</td>
                  <td key={ofertas._id} className="px-6 py-4">{e.skills}</td>
                  <td key={ofertas._id} className="px-6 py-4">{e.ciclo}</td>
                  <td key={ofertas._id} className="px-6 py-4">{e.dateOfPublication}</td>
                  
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
  console.log(ofertas);

    return html
   
}

