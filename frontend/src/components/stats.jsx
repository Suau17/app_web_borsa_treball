import { updateEmpresa } from "../services/gestor/empresaUpdate";
import { RegisterResponsable } from "../services/register";
import { RegisterOferta } from '../services/gestor/ofertaRegister';
import { useState, useEffect } from "react";
import { getEmpresa } from "../services/gestor/empresaGet";
import { statsOfertas, statsUsers } from "../services/stats";

import '../assets/empresa.css'
import '../assets/register.css'


export function EstadisticasApp() {
  const [activeForm, setActiveForm] = useState("upEmpresa");
  const [ofertas, setStatsOfertas] = useState([])
  const [users, setStatsUsers] = useState([])
  const [ciclos, setCiclos] = useState([])
  let resultado = [];
  useEffect(() => {

    statsOfertas().then(ofertas => setStatsOfertas(ofertas));
    statsUsers().then(users => setStatsUsers(users))
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


if(ofertas.ofertasPorCiclo) {   
for (const propiedad in ofertas.ofertasPorCiclo) {
  const objeto = {
    name: propiedad,
    cantidad: ofertas.ofertasPorCiclo[propiedad]
  };
  resultado.push(objeto);
}
}

if(users){console.log(users)}

const ListarOfertas = () =>{
    return resultado.map((e) => (
        <li key={e.name}>
          {e.name} : {e.cantidad}
        </li>
      ));
}


  return (
      <>
      <div className="buttons">
        <button onClick={handleFormEmpresa}>Ofertas</button>
        <button onClick={handleFormResp}>Usuarios</button>
        <button onClick={handleFormOferta}>Empresas</button>
      </div>

      <div className={activeForm === 'upEmpresa' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
            <h1>Ofertas</h1>
            <span>Ordenadas por categoria</span>
            {resultado ? <ListarOfertas />:''}
         
      </div>

      <div className={activeForm === 'resp' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
            <h1>Usuarios</h1>
            {users ? <p>{users.msg}</p>:''}
      </div>
      <div className={activeForm === 'oferta' ? 'form-container sign-up-container' : 'form-container sign-up-container hidden'}>
       <h1>Empresas</h1>
      </div>
    </>
  )


}
