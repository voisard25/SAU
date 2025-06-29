import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import utnLogo from '../assets/utn.png'

const AuthForm = ({ userType }) => {
    const [credentials, setCredentials] = useState({
        usuario: '',
        password: '',
        cuit: '',
        legajo: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    // Configuración de roles y sus validaciones
    const roleConfig = {
        admin: {
            dataKey: 'admin',
            identifierField: 'usuario',
            validateIdentifier: (user, cred) => 
                user.usuario.trim().toLowerCase() === cred.usuario.trim().toLowerCase()
        },
        empresa: {
            dataKey: 'empresas',
            identifierField: 'cuit',
            validateIdentifier: (user, cred) => 
                user.cuit.toString() === cred.cuit.trim()
        },
        estudiante: {
            dataKey: 'estudiantes',
            identifierField: 'legajo',
            validateIdentifier: (user, cred) => 
                user.legajo.toString() === cred.legajo.trim()
        }
    }

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
            // Primero buscar en sessionStorage
            const empresaRegistrada = JSON.parse(sessionStorage.getItem('empresaRegistrada'))
            
            if (userType === 'empresa' && empresaRegistrada) {
                // Comparar credenciales con los datos en sessionStorage
                if (empresaRegistrada.cuit === credentials.cuit.trim() && 
                    empresaRegistrada.password === credentials.password) {
                    const userData = {
                        ...empresaRegistrada,
                        role: 'empresa',
                        lastLogin: new Date().toISOString()
                    }
                    login(userData)
                    navigate('/empresa')
                    return
                }
            }
    
            // Si no se encuentra en sessionStorage o no coinciden las credenciales,
            // continuar con la búsqueda en users.json
            const response = await fetch('/src/data/users.json')
            if (!response.ok) throw new Error('No se encontraron usuarios. Verifique users.json')
        
            const usersData = await response.json()
            const roleSettings = roleConfig[userType]
    
            if (!roleSettings) {
                throw new Error('Tipo de usuario no válido')
            }
    
            const user = usersData[roleSettings.dataKey].find(u => 
                roleSettings.validateIdentifier(u, credentials) && 
                u.password.toString() === credentials.password.trim()
            )
    
            if (!user) {
                throw new Error('Credenciales incorrectas')
            }
    
            // Agregar datos adicionales según el tipo de usuario
            const userData = {
                ...user,
                role: userType,
                lastLogin: new Date().toISOString()
            }
    
            // Para estudiantes, agregar datos específicos
            if (userType === 'estudiante') {
                userData.postulaciones = []
            }
    
            login(userData)
            navigate(`/${userType}`)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
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
                    {userType === 'admin' && (
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
                    )}
        
                    {userType === 'empresa' && (
                        <div>
                            <label htmlFor="cuit" className="block text-sm font-medium text-gray-700 mb-1">
                                CUIT
                            </label>
                            <input
                                type="text" // Cambiado de "number" a "text"
                                id="cuit"
                                name="cuit"
                                pattern="[0-9]{11}" // Agregado para validar formato
                                title="El CUIT debe tener 11 dígitos"
                                value={credentials.cuit}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="CUIT"
                            />
                        </div>
                    )}
        
                    {userType === 'estudiante' && (
                        <div>
                            <label htmlFor="legajo" className="block text-sm font-medium text-gray-700 mb-1">
                                Legajo
                            </label>
                            <input
                                type="number"
                                id="legajo"
                                name="legajo"
                                value={credentials.legajo}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="Legajo"
                            />
                        </div>
                    )}
        
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

                {(userType === 'empresa' || userType === 'estudiante') && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                        <p>
                            ¿Aún no tenés cuenta?{' '}
                            <Link 
                                to={`/${userType}/register`} 
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Crear cuenta
                            </Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthForm