import React, { useEffect, useState } from "react";
import { VerOfertas } from "../services/ofertasList";
import '../App.css'
import '../assets/oferta.css'


export function OfertasT() {
    
    let [ofertas, setOfertas] = useState([]);
  
    useEffect(() => {
        VerOfertas().then(ofertas => setOfertas(ofertas))
        console.log(ofertas)
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
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ml-80 my-4 w-2/3 ">
              <table class="w-full text-sm text-left text-black-500 dark:text-black-400 w-50  ">
                <thead class="border-b border-neutral-800  text-neutral-50 dark:border-neutral-600  bg-blue-900">
                  <th scope="col" class="px-6 py-3">Titulo</th>
                  <th scope="col" class="px-6 py-3">Description</th>
                  <th scope="col" class="px-6 py-3">Requisitos</th>
                  <th scope="col" class="px-6 py-3">Skills</th>
                  <th scope="col" class="px-6 py-3">Ciclo</th>
                  <th scope="col" class="px-6 py-3">Fecha de publicacion</th>
                </thead>
                <tbody>
                { ofertas.listaOfertas.map(e =>
                <tr  class="bg-white border-2 border-blue-500  hover:bg-gray-200">
                  <td key={ofertas._id} class="px-6 py-4">{e.title}</td>
                  <td key={ofertas._id} class="px-6 py-4">{e.description}</td>
                  <td key={ofertas._id} class="px-6 py-4">{e.requeriments}</td>
                  <td key={ofertas._id} class="px-6 py-4">{e.skills}</td>
                  <td key={ofertas._id} class="px-6 py-4">{e.ciclo}</td>
                  <td key={ofertas._id} class="px-6 py-4">{e.dateOfPublication}</td>
                  
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

               {/* <p>TITULO:{e.title}</p>
               <p>{e.description}</p>
               <p>{e.requeriments}</p>
               <p>{e.skills}</p>
               <p>{e.ciclo}</p>
               <p>{e.dateOfPublication}</p> */}

               
               
            {/* </div>
           
           <input type="button" value="Delete" onClick={removeOf} />
            </div> */}
            </>
         
           
    }
    else{
         html = (
            <>
           <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            </>
        )
    }
  console.log(ofertas);

    return html
   
}

