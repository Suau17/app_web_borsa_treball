import React from 'react'
import  RegisterForm  from '../../components/register'
import { getCookie } from '../../context/cookies'


function Register() {
  let token = getCookie('vToken')
  if(token){
    history.back()
  }
  return (
    <>
      <RegisterForm />
    </>
  )
}

export { Register }