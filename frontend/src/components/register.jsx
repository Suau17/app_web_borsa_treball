import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { RegisterGestor, RegisterAlumno } from '../services/register';
import '../assets/register.css'


function RegisterForm() {
  const [activeForm, setActiveForm] = useState("gestor");
  const navigate = useNavigate()
  const handleFormAlumno = () => {
    setActiveForm("alumno");
  };

  const handleFormGestor = () => {
    setActiveForm("gestor");
  };
  useEffect(() => { console.log(activeForm) }, [activeForm]);
  function handleClickEmpresa(event) {
    event.preventDefault()
    const gestor = Object.fromEntries(
      new window.FormData(event.target)
    )
    RegisterGestor(gestor).then(navigate('/'))
  }

  function handleClickAlumno(event) {
    event.preventDefault()
    const alumno = Object.fromEntries(
      new window.FormData(event.target)
    )
    RegisterAlumno(alumno)
    console.log(alumno)
  }

  return (
    <>
      <section className='containerRegister'>
      <div className="buttonsR">
          <button onClick={handleFormAlumno}>Registrar Alumno</button>
          <button onClick={handleFormGestor}>Registrar Gestor</button>
        </div>
        <div >
          <div className={activeForm === 'gestor' ? 'form-containerR sign-up-container' : 'form-containerR sign-up-container hidden'}>

            {/* EMPRESA */}

            <form onSubmit={handleClickEmpresa} id="alumno-form" className="form">
              <h1>Registrat com empresa</h1>
              <h2>Gestor:</h2>
              <span>Dades de contacte del que gestiona el compte de la empresa:</span>
              <input type="text" name='name' placeholder="Name" />
              <input type="email" name='email' placeholder="Email" />
              <input type="password" name='password' placeholder="Password" />
              <input type="text" name='cargo' placeholder='carrec a la empresa (ex : responsable IT)' />
              <input type="text" name='telefon' placeholder='telefon' />
              <h2>Empresa:</h2>
              <span>Registrar com empresa i publica ofertes de treball</span>
              <input type="text" name='empresa' placeholder="nom de l'empresa" />
              <input type="text" name='direction' placeholder='Calle de la empresa/oficina' />

              <input type="text" name='sector' placeholder="sector de l'empresa" />

              <button>Sign Up</button>
            </form>
          </div>


          {/* ALUMNE */}

          <div className={activeForm === 'alumno' ? 'form-containerR sign-up-container' : 'form-containerR sign-up-container hidden'}>
            <form onSubmit={handleClickAlumno} id="alumno-form" className="form">
              <h1>Alumne</h1>
              <span>Registrat com estudiant i comença a inscriuret a ofertes</span>
              <input type="text" name='name' placeholder="Name" />
              <input type="email" name='email' placeholder="Email" />
              <input type="password" name='password' placeholder="Password" />
              <textarea name="cartaPresentacion" placeholder='hola me llamo xxxx y ....'
                id="" cols="45" rows="6" className='textAreaCV' >
              </textarea>
              <input type="text" name="link" placeholder='link de la teva pagina (linkedin, repositori, github)' />
              <i>curriculum (pdf):</i>
              <input type="file" name='cvFile' accept="image/*,.pdf" />
              <button className='btnSign'>Sign Up</button>
            </form>
          </div>
          
        </div>
      </section>
    </>
  );
}

export default RegisterForm;