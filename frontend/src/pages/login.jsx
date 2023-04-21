import React from 'react'
import { LoginForm } from '../components/login'
import { getCookie } from '../context/cookies'


function Login() {
  let token = getCookie('vToken')
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