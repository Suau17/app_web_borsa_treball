import { updateEmpresa } from "../services/gestor/empresaUpdate";
import { RegisterResponsable } from "../services/register";
import { RegisterOferta } from '../services/gestor/ofertaRegister';
import { useState, useEffect } from "react";
import { getEmpresa } from "../services/gestor/empresaGet";
import '../assets/empresa.css'
import '../assets/register.css'


export function GestionOperaciones() {
  const [activeForm, setActiveForm] = useState("upEmpresa");
  const [empresa, setEmpresa] = useState([])
  useEffect(() => {
    getEmpresa().then(empresa => setEmpresa(empresa));
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

  if (empresa.nom) {
    
  }
  return (
    <>
      <div className="buttons">
        <button onClick={handleFormEmpresa}>formulari empresa</button>
        <button onClick={handleFormResp}>formulari responsable</button>
        <button onClick={handleFormOferta}>Registrar Oferta</button>
      </div>

      <div className={activeForm === 'upEmpresa' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
        <div className=" divResp ">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Empresa Update</h1>
          <form onSubmit={handleClickEmpresa} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Nom de l'empresa</span>
            <input type="text" name="nom" defaultValue={empresa.nom} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Direccion de l'empresa</span>
            <input type="text" name="direccion" defaultValue={empresa.direccion} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2"> Sector</span>
            <input type="text" name="sector" defaultValue={empresa.sector} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> <br />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
          </form>
        </div>
      </div>

      <div className={activeForm === 'resp' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
        <div className=" divResp">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Crear Responsable</h1>

          <form onSubmit={handleClickResp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Nom</span>
            <input type="text" name='name' placeholder="Name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Email</span>
            <input type="email" name='email' placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Password</span>
            <input type="password" name='password' placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">Carrec empresa</span>
            <input type="text" name='cargo' placeholder='carrec a la empresa (ex : responsable IT)' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />
            <span className="block text-gray-700 text-sm font-bold mb-2">telefon</span>
            <input type="text" name='telefon' placeholder='telefon' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br />

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Guardar</button>
          </form>
        </div>
      </div>
      <div className={activeForm === 'oferta' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
        <div className=" divResp">
          <h1 className="block text-gray-700 text-xl font-bold mb-2">Registrar Oferta de trabajo</h1>
          <form onSubmit={handleClickOferta} id="ofertaR" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">Title</span>
            <input type="text" name="title" id="title" placeholder='title' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Descripcion</span>
            <input type="text" name="description" id="description" placeholder='description' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Requerimientos</span>
            <input type="text" name="requirements" id="requirements" placeholder='requeriments' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Skills</span>
            <input type="text" name="skills" id="skills" placeholder='skills' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Ciclo</span>
            <input type="text" name="ciclo" id="ciclo" placeholder='ciclo' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <span className="block text-gray-700 text-sm font-bold mb-2">Fecha de publicacion</span>
            <input type="date" name="dateOfPublication" id="dateOfPublication" placeholder='dateOfPublication' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /><br></br>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" >Sign Up</button><br />
          </form>
        </div>
      </div>
    </>
  )


}
