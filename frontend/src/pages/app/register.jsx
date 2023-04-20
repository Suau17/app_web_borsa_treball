import React from 'react'
import  RegisterForm  from '../../components/register'


function Register() {
  let token = localStorage.getItem('vToken')
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