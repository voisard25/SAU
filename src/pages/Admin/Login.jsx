import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import utnLogo from '../../assets/utn.png'
import fondo from '../../assets/fondo.png'

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        usuario: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        try {
            const response = await fetch('/src/data/users.json')
            if (!response.ok) throw new Error('No se encontraron usuarios. Verifique users.json')
        
            const usersData = await response.json()
            const user = usersData.admin.find(u => 
                u.usuario.trim().toLowerCase() === credentials.usuario.trim().toLowerCase() && 
                u.password === credentials.password
            )
        
            if (!user) throw new Error('Credenciales incorrectas')
            
            login({ ...user, role: 'admin' })
            navigate('/admin')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center p-4" 
             style={{ backgroundImage: `url(${fondo})` }}>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <img src={utnLogo} alt="UTN Logo" className="h-20" />
                </div>
        
                <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
        
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700 mb-1">
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            value={credentials.usuario}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Usuario"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Contraseña"
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50"
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin