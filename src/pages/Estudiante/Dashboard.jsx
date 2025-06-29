import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/Footer'
import OfertasPasantias from './OfertasPasantias'

const EstudianteDashboard = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [mostrarOfertas, setMostrarOfertas] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleVerOfertas = () => {
        setMostrarOfertas(!mostrarOfertas)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600 uppercase">Panel de Estudiante</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleVerOfertas}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        >
                            Ofertas de Pasantía
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-grow">
                {mostrarOfertas && <OfertasPasantias />}
            </main>

            <Footer />
        </div>
    )
}

export default EstudianteDashboard