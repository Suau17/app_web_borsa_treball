import { updateEmpresa } from "../services/gestor/empresaUpdate";
import { RegisterResponsable } from "../services/app/register";
import { RegisterOferta } from '../services/gestor/ofertaRegister';
import { useState, useEffect } from "react";
import { getEmpresa } from "../services/gestor/empresaGet";
import { getCiclos } from "../services/app/ciclos";
import '../assets/empresa.css'
import '../assets/register.css'


export function GestionOperaciones() {
  const [activeForm, setActiveForm] = useState("upEmpresa");
  const [empresa, setEmpresa] = useState([])
  const [ciclos, setCiclos] = useState([])
  useEffect(() => {
    getEmpresa().then(empresa => setEmpresa(empresa));
    getCiclos().then(ciclos => setCiclos(ciclos))
  }, [])

  const handleFormEmpresa = () => {
    setActiveForm("upEmpresa");
  };


  const handleFormResp = () => {
    setActiveForm("resp");
  }

  const handleFormOferta = () => {
    setActiveForm("oferta");
  }

  useEffect(() => { }, [activeForm]);

  function handleClickEmpresa(event) {
    event.preventDefault()
    const empresa = Object.fromEntries(
      new window.FormData(event.target)
    )
    updateEmpresa(empresa)
  }

  function handleClickResp(event) {
    event.preventDefault()
    const resp = Object.fromEntries(
      new window.FormData(event.target)
    )
    RegisterResponsable(resp)
  }

  function handleClickOferta(event) {
    event.preventDefault()
    const oferta = Object.fromEntries(
      new window.FormData(event.target)
    )
    RegisterOferta(oferta)
  }


  return (
    <>
      <div className="buttons">
        <button onClick={handleFormEmpresa}>Editar Empresa</button>
        <button onClick={handleFormResp}>Registrar responsable</button>
        <button onClick={handleFormOferta}>Registrar Oferta</button>
      </div>

      <div className={activeForm === 'upEmpresa' ? 'form-containerE sign-up-container' : 'form-containerE sign-up-container hidden'}>
        <div className=" divResp ">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Actualitzar empresa</h1>
          <form onSubmit={handleClickEmpresa} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Nom de l'empresa</span>
            <input type="text" name="nameEmpresa" defaultValue={empresa.nom} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Direcció de l'empresa</span>
            <input type="text" name="direccion" defaultValue={empresa.direccion} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2"> Sector</span>
            <input type="text" name="sector" defaultValue={empresa.sector} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> <br />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
          </form>
        </div>
      </div>

      <div className={activeForm === 'resp' ? 'form-containerE sign-up-container' : 'form-containerE sign-up-container hidden'}>
        <div className=" divResp">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Crear Responsable</h1>

          <form onSubmit={handleClickResp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Nom</span>
            <input type="text" name='name' placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Email</span>
            <input type="email" name='email' placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Contrassenya</span>
            <input type="password" name='password' placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Càrrec empresa</span>
            <input type="text" name='cargo' placeholder='carrec a la empresa (ex : responsable IT)' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Telèfon</span>
            <input type="text" name='telefon' placeholder='telefon' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
          </form>
        </div>
      </div>
      <div className={activeForm === 'oferta' ? 'form-containerE sign-up-container' : 'form-containerE sign-up-container hidden'}>
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
