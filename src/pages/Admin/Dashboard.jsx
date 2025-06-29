import { useAuth } from '../../context/AuthContext'
import Footer from '../../components/Footer'

const AdminDashboard = () => {
    const { user, logout } = useAuth()

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-blue-600 text-white p-4 shadow">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Panel de Administración</h1>
                    <button 
                        onClick={logout}
                        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </header>
        
            <main className="container mx-auto p-4 flex-grow">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Bienvenido, {user?.usuario}</h2>
                    <p>Este es el panel de administración del sistema de pasantías.</p>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AdminDashboard