import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/Footer'
import PasantiaCard from '../../components/PasantiaCard'

const EmpresaDashboard = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [pasantias, setPasantias] = useState([])

    useEffect(() => {
        const pasantiasGuardadas = JSON.parse(localStorage.getItem('pasantias') || '[]')
        setPasantias(pasantiasGuardadas)
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleCrearPasantia = () => {
        navigate('/empresa/crear-pasantia')
    }

    const handleVerDetalles = (id) => {
        navigate(`/empresa/pasantia/${id}`)
    }

    const handleEliminarPasantia = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta pasantía?')) {
            const pasantiasActualizadas = pasantias.filter(p => p.id !== id)
            localStorage.setItem('pasantias', JSON.stringify(pasantiasActualizadas))
            setPasantias(pasantiasActualizadas)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600 uppercase">PANEL DE EMPRESA</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleCrearPasantia}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
                        >
                            Crear Pasantía
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

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pasantias.length === 0 ? (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-600 text-lg">No hay pasantías creadas. Haz clic en 'Crear Pasantía' para publicar una nueva oferta.</p>
                        </div>
                    ) : (
                        pasantias.map((pasantia) => (
                            <PasantiaCard
                                key={pasantia.id}
                                pasantia={pasantia}
                                onVerDetalles={handleVerDetalles}
                                showPostularButton={false}
                                showEliminarButton={true}
                                onEliminar={handleEliminarPasantia}
                            />
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default EmpresaDashboard