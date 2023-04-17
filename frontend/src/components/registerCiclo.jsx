import React, { useEffect, useState } from 'react';
import { ciclolist } from '../services/ciclosList';

export function registerCiclo(){

    function handleClickCiclo(event){
        event.preventDefault()
        const ciclo = Object.fromEntries(
            new window.FormData(event.target)
        )
            ciclolist(ciclo)
    }

    return(
        <>
            <div className=" divResp w-full max-w-xs">
        <h1 class="block text-gray-700 text-xl font-bold mb-2">Registrar Ciclo</h1>
            <form onSubmit={handleClickCiclo}  id="ofertaR" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <span class="block text-gray-700 text-sm font-bold mb-2">Name</span>
                <input type="text" name="title" id="title" placeholder='title' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
                <span class="block text-gray-700 text-sm font-bold mb-2">Familia profesional</span>
                <input type="text" name="description" id="description" placeholder='description' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
                <span class="block text-gray-700 text-sm font-bold mb-2">Requerimients</span>
                <input type="text" name="requirements" id="requirements" placeholder='requeriments' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
                <span class="block text-gray-700 text-sm font-bold mb-2">Skills</span>
                <input type="text" name="skills" id="skills" placeholder='skills' class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
              
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" >Sign Up</button><br />
            </form>
            </div>



        
        </>
    )
}