import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Landing from './pages/Landing/Index'
import LoadingSpinner from './components/LoadingSpinner'
import CrearPasantia from './pages/Empresa/CrearPasantia'
import DetallePasantiaEstudiante from './pages/Estudiante/DetallePasantiaEstudiante'

// Agregar el import de DetallePasantia
const DetallePasantia = lazy(() => import('./pages/Empresa/DetallePasantia'))

const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/" />
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/" />
  }
  
  return children
}

const AdminLogin = lazy(() => import('./pages/Admin/Login'))
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'))
const EmpresaLogin = lazy(() => import('./pages/Empresa/Login'))
const EmpresaDashboard = lazy(() => import('./pages/Empresa/Dashboard'))
const EstudianteLogin = lazy(() => import('./pages/Estudiante/Login'))
const EstudianteDashboard = lazy(() => import('./pages/Estudiante/Dashboard'))
const EmpresaRegister = lazy(() => import('./pages/Empresa/Register'))
const EstudianteRegister = lazy(() => import('./pages/Estudiante/Register'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route path="/empresa/login" element={<EmpresaLogin />} />
        <Route 
          path="/empresa" 
          element={
            <PrivateRoute role="empresa">
              <EmpresaDashboard />
            </PrivateRoute>
          } 
        />
        
        <Route
          path="/empresa/crear-pasantia"
          element={
            <PrivateRoute role="empresa">
              <CrearPasantia />
            </PrivateRoute>
          }
        />
        <Route path="/empresa/pasantia/:id"
          element={
            <PrivateRoute role="empresa">
              <DetallePasantia />
            </PrivateRoute>
          }
        />
        <Route path="/estudiante/login" element={<EstudianteLogin />} />
        <Route
            path="/estudiante"
            element={
                <PrivateRoute role="estudiante">
                    <EstudianteDashboard />
                </PrivateRoute>
            }
        />
        
        <Route path="/empresa/register" element={<EmpresaRegister />} />
        <Route path="/estudiante/register" element={<EstudianteRegister />} />
        <Route
          path="/estudiante/pasantia/:id"
          element={
            <PrivateRoute role="estudiante">
              <DetallePasantiaEstudiante />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes