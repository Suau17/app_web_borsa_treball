import { UserProfile } from './pages/profile'
import { Login } from './pages/login'
import { Logout } from './services/login'
import { Home } from './pages/home'
import { Register } from './pages/register'
import { PageOfertas } from './pages/GetOfertas'
import { TableOfertas } from './pages/tableOferta'
import { ShowOfertas } from './pages/showOferta'
import { PageEmployees } from './pages/Gestor/empleados'
import { Menu } from './components/menu'
import { PageUsers } from './pages/users'
import { PageEditAlumne } from './pages/Alumne/editAlumne'
import { PageEmpresa } from './pages/Gestor/empresa'
import { TableEmpresa } from './pages/empresa'
import { EspecificUser } from './pages/especificUser'
import { RegisterC} from './pages/crearCiclos'
import { EstadisticasApp } from './components/stats'
import { AuthProvider } from './context/Autenticate'
import { PageInscripcionesAlumne } from './pages/Alumne/inscripcionesAlumno'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import { Toaster, toast } from 'sonner'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Footer} from './components/footerShow';


import './App.css'
import { getCookie } from './context/cookies'

let token = getCookie('vToken')

function App() {

  return (

    <Router>
      <Toaster position="bottom-right" expand={false} richColors  duration={5000} />
      <Menu />
      <AuthProvider>
        <Routes>
        {token ? (
            <>
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}


          <Route path="/" element={<Home />} />
          <Route path='/logout' element={<Logout />} />
          <Route path="/getOfertas" element={<PageOfertas />} />

          <Route path="/User" element={<UserProfile />} />
          {/* <RoleProtectedRoute path='/User' allowedRoles={['admin', 'gestor', 'alumno']} element={<UserProfile />}/> */}

          <Route element={<RoleProtectedRoute allowedRoles={['gestor', 'responsable']} />}>
            <Route path="/empresa" element={<PageEmpresa />} />
            <Route path="/empleados" element={<PageEmployees />} />
            <Route path="/search/user/:id" element={<EspecificUser />} />
          </Route>

          <Route element={<RoleProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/stats" element={<EstadisticasApp />} />
          </Route>

          <Route path="/inscripciones" element={<PageInscripcionesAlumne />} />
          <Route path="/TableEmpresa" element={<TableEmpresa />} />
          <Route path="/tableOfertas" element={<TableOfertas />} />
          <Route path='/oferta/:idOferta' element={<ShowOfertas />} />
          <Route path='users' element={<PageUsers />} />
          <Route path="/editAlumne" element={<PageEditAlumne />} />
          <Route path="/crearCiclos" element={<RegisterC />} />
            
        </Routes>
      </AuthProvider>
      <Footer />
    </Router>
    
            
  )
}

export default App