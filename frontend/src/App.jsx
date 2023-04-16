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
import { AuthProvider } from './context/Autenticate'
import RoleProtectedRoute from './components/RoleProtectedRoute'
import { Toaster, toast } from 'sonner'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import './App.css'

let token = localStorage.getItem('vToken')

function App() {

  return (

    <Router>
      <Toaster position="bottom-right" expand={true} richColors />
      <Menu />
      <AuthProvider>
        <Routes>
        {token ? (
            // si el usuario ya está autenticado, redirigirlo a la página principal o a cualquier otra ruta que desees
            <>
            </>
          ) : (
            // si el usuario no está autenticado, permitir el acceso a las rutas de registro y login
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

          <Route path="/TableEmpresa" element={<TableEmpresa />} />
          <Route path="/tableOfertas" element={<TableOfertas />} />
          <Route path='/oferta/:idOferta' element={<ShowOfertas />} />
          <Route path='users' element={<PageUsers />} />
          <Route path="/editAlumne" element={<PageEditAlumne />} />

        </Routes>
      </AuthProvider>
    </Router>

  )
}

export default App