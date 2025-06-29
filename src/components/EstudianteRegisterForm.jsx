import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import utnLogo from '../assets/utn.png'
import studentsData from '../data/users.json'

const EstudianteRegisterForm = () => {
    const [verificationData, setVerificationData] = useState({
        legajo: '',
        dni: ''
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleVerificationChange = (e) => {
        const { name, value } = e.target
        setVerificationData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleVerificationSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        const { legajo, dni } = verificationData

        // Verificar si el estudiante existe en la base de datos simulada
        const existingStudent = studentsData.estudiantes.find(
            student => student.legajo.toString() === legajo && student.dni === dni
        )

        // Verificar si ya existe una cuenta registrada (con password)
        const registeredStudent = studentsData.estudiantes.find(
            student => (student.legajo.toString() === legajo || student.dni === dni) && student.password
        )

        if (!existingStudent) {
            setError('No se ha encontrado un estudiante con el legajo y DNI ingresados. ')
            return
        }

        if (registeredStudent) {
            setError('Ya existe una cuenta registrada con el legajo o DNI ingresado. Iniciá sesión o recuperá tu contraseña.')
            return
        }

        // Si pasa las verificaciones, mostrar mensaje de éxito
        setSuccess('¡Verificación exitosa! Tu identidad ha sido confirmada.')
        
        // Opcional: redirigir después de un tiempo
        setTimeout(() => {
            navigate('/login/estudiante')
        }, 3000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img className="mx-auto h-12 w-auto" src={utnLogo} alt="UTN Logo" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Verificación de Estudiante
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Ingresa tu legajo y DNI para verificar tu identidad
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-start" role="alert">
                        <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-start" role="alert">
                        <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}

                <form onSubmit={handleVerificationSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="legajo" className="block text-sm font-medium text-gray-700 mb-1">
                                Legajo *
                            </label>
                            <input
                                type="text"
                                id="legajo"
                                name="legajo"
                                required
                                pattern="[0-9]+"
                                title="El legajo debe contener solo números"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Ingresa tu número de legajo"
                                value={verificationData.legajo}
                                onChange={handleVerificationChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                                DNI *
                            </label>
                            <input
                                type="text"
                                id="dni"
                                name="dni"
                                required
                                pattern="[0-9]{7,8}"
                                title="El DNI debe tener 7 u 8 dígitos"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Ingresa tu DNI"
                                value={verificationData.dni}
                                onChange={handleVerificationChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Verificar Identidad
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EstudianteRegisterForm 