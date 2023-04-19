import React from 'react'
import { LoginForm } from '../components/login'


function Login() {
  let token = localStorage.getItem('vToken')
  if(token){
    history.back()
  }
  return (
    <>
      <LoginForm />
    </>
  )
}

export { Login }