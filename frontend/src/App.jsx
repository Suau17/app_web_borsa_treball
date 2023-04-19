import { UserProfile } from './pages/profile'
import { Login } from './pages/login'
import { Logout } from './services/login'
import { Home } from './pages/home'
import { Register } from './pages/register'
import { PageOfertas } from './pages/GetOfertas'
import { TableOfertas } from './pages/tableOferta'
import {ShowOfertas} from './pages/showOferta'
import { PageEmployees } from './pages/Gestor/empleados'
import { Menu } from './components/menu'
import { PageUsers } from './pages/users'
import { PageEditAlumne } from './pages/Alumne/editAlumne'
import { PageEmpresa } from './pages/Gestor/empresa'
import { TableEmpresa } from './pages/empresa'
import { Inscripciones } from './components/inscripcionesEstudiante'
import { EspecificUser } from './pages/especificUser'
import { RegisterC} from './pages/crearCiclos'
import { AuthProvider } from './context/Autenticate'
import { OfertasInscrito } from './components/inscripcionesEstudiante'
import RoleProtectedRoute from './components/RoleProtectedRoute'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css'



function App() {

  return (

    <Router>
      <Menu />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Logout />} />

        <Route path="/User" element={<UserProfile />} />
        {/* <RoleProtectedRoute path='/User' allowedRoles={['admin', 'gestor', 'alumno']} element={<UserProfile />}/> */}

        <Route element={<RoleProtectedRoute  allowedRoles={['gestor', 'responsable' ]}/>}>
        <Route path="/empresa" element={<PageEmpresa />} />
        <Route path="/empleados" element={<PageEmployees />} />
        <Route path="/search/user/:id" element={<EspecificUser />} />
        </Route>


          <Route path="/crearCiclos" element={<RegisterC />} />


        <Route path="/TableEmpresa" element={<TableEmpresa />} />
        <Route path="/getOfertas" element={<PageOfertas />} />
        <Route path="/tableOfertas" element={<TableOfertas />} />
        <Route path='/oferta/:idOferta' element={<ShowOfertas />} />
        <Route path='users' element={<PageUsers />} />
        <Route path="/editAlumne" element={<PageEditAlumne />} />
        <Route path='/verInscripciones' element={< Inscripciones/>} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App