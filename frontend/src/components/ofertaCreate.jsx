import { RegisterOferta } from '../services/gestor/ofertaRegister';
import { useState, useEffect } from "react";
import { getEmpresa } from "../services/gestor/empresaGet";
import { getCiclos } from "../services/app/ciclos";
import '../assets/empresa.css'
import '../assets/register.css'


export function GestionOperacionesResponsable() {
  const [activeForm, setActiveForm] = useState("upEmpresa");
  const [empresa, setEmpresa] = useState([])
  const [ciclos, setCiclos] = useState([])
  useEffect(() => {
    getEmpresa().then(empresa => setEmpresa(empresa));
    getCiclos().then(ciclos => setCiclos(ciclos))
  }, [])

  useEffect(() => { }, [activeForm]);

  function handleClickOferta(event) {
    event.preventDefault()
    const oferta = Object.fromEntries(
      new window.FormData(event.target)
    )
    RegisterOferta(oferta)
  }


  return (
    <>

      <div className={activeForm === 'oferta' ? 'form-containerP sign-up-container' : 'form-containerP sign-up-container '}>
        <div className=" divResp">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Registrar oferta de treball</h1>
          <form onSubmit={handleClickOferta} id="ofertaR" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Títol</span>
            <input type="text" name="title" id="title" placeholder='title' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Descripció</span>
            <input type="text" name="description" id="description" placeholder='description' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Requeriments</span>
            <input type="text" name="requirements" id="requirements" placeholder='requeriments' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Habilitats</span>
            <input type="text" name="skills" id="skills" placeholder='skills' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Cicle</span>
            <select name="ciclo" id="ciclo" placeholder='ciclo' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {
                ciclos ?      ciclos.map( e => {
                  return (<option>{e.name}</option>)
                }) : ''
              }
            </select>
            <span className="block text-gray-700 text-sm font-bold mb-2">Data de publicació</span>
            <input type="date" name="dateOfPublication" id="dateOfPublication" placeholder='dateOfPublication' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" >Sign Up</button><br />
          </form>
        </div>
      </div>
    </>
  )


}
