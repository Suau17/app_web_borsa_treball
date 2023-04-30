import React from 'react'
import { GestionOperaciones } from '../../components/gestionsEmpresa'
import { GestionOperacionesResponsable } from '../../components/ofertaCreate'
import { getCookie } from '../../context/cookies'
let role = getCookie('vRole')
function PageEmpresa() {
  console.log(role)
  if (role == 'gestor') {
    return (
      <>
        <GestionOperaciones />
      </>
    )
  }
  if (role == 'responsable') {
    return (
      <>
        <GestionOperacionesResponsable />
      </>
    )
  }


}

export { PageEmpresa }