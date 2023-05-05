import React, { useEffect, useState } from 'react';
import { RegisterCiclo } from '../services/ciclosList';
import '../assets/register.css'
export function CrearCiclo(){

    
    function handleClickCiclo(event){
        event.preventDefault()
        const ciclo = Object.fromEntries(
            new window.FormData(event.target)
        )
        RegisterCiclo(ciclo)
    }

    return(
        <>
            <div className=" registerCiclo ">
        <h1 className="block text-gray-700 text-xl font-bold mb-2">Registrar Ciclo</h1>
            <form onSubmit={handleClickCiclo}  id="ofertaR" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <span className="block text-gray-700  font-bold mb-2">Name</span>
                <input type="text" name="name" id="name" placeholder='name' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
                <span className="block text-gray-700  font-bold mb-2">Familia profesional</span>
                <select type="text" name="familiaProfesional" id="familiaProfesional" placeholder='familiaProfesional' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="0">--Selecciona---</option>
                    <option value="FAMÍLIA D'ADMINISTRACIÓ I GESTIÓ">FAMÍLIA D'ADMINISTRACIÓ I GESTIÓ</option>
                    <option value="FAMÍLIA DE COMERÇ I MÀRQUETING">FAMÍLIA DE COMERÇ I MÀRQUETING</option>
                    <option value="FAMÍLIA D'INFORMÀTICA I COMUNICACIONS">FAMÍLIA D'INFORMÀTICA I COMUNICACIONS</option>
                    <option value="FAMÍLIA DE SERVEIS SOCIOCULTURALS I A LA COMUNITAT">FAMÍLIA DE SERVEIS SOCIOCULTURALS I A LA COMUNITAT</option>
                    </select><br></br>
                <span className="block text-gray-700  font-bold mb-2">Durada</span>
                <input type="number" name="durada" id="durada" placeholder='durada' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
                <span className="block text-gray-700  font-bold mb-2">asignatures</span>
                <input type="text" name="asignatures" id="asignatures" placeholder='asignatures' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/><br></br>
              
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" >Sign Up</button><br />
            </form>
            </div>



        
        </>
    )
}