import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import utnLogo from '../assets/utn.png'

const RegisterForm = ({ userType }) => {
  const [step, setStep] = useState('form') // 'form', 'verification', 'password'
  const [formData, setFormData] = useState({
    razonSocial: '',
    cuit: '',
    rubro: '',
    domicilio: '',
    email: '',
    telefono: '',
    referente: '',
    cargo: '',
    ubicacion: '',
    sitioWeb: '', // opcional
    redesSociales: '', // opcional
    password: ''
  })
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const handleInitialSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // Guardar datos del formulario en sessionStorage
      sessionStorage.setItem('empresaData', JSON.stringify(formData))

      // Generar y guardar código de verificación
      const code = generateVerificationCode()
      sessionStorage.setItem('codigoVerificacion', code)

      // Enviar email y código al backend
      const response = await fetch('/api/verificacion/enviar-codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          code: code
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error en el servidor')
      }
      
      setSuccess('¡Datos cargados con éxito! Te enviamos un código de verificación.')
      setStep('verification')
    } catch (err) {
      if (!navigator.onLine) {
        setError('Error de conexión. Por favor, verifica tu conexión a internet.')
      } else if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError('No se pudo conectar con el servidor. Por favor, intenta nuevamente.')
      } else {
        setError(err.message || 'Error al enviar el código de verificación')
      }
    }
  }

  const handleVerificationSubmit = (e) => {
    e.preventDefault()
    setError('')
    const storedCode = sessionStorage.getItem('codigoVerificacion')

    if (verificationCode === storedCode) {
      setSuccess('¡Código verificado correctamente!')
      setStep('password')
    } else {
      setError('Código de verificación incorrecto')
    }
  }

  const validatePassword = (password) => {
    const minLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return minLength && hasNumber && hasUpper && hasLower && hasSpecial
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validatePassword(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, números y caracteres especiales')
      return
    }
    
    try {
      const empresaData = JSON.parse(sessionStorage.getItem('empresaData'))
      const finalData = { ...empresaData, password: formData.password }

      // Guardar datos completos en sessionStorage
      sessionStorage.setItem('empresaRegistrada', JSON.stringify(finalData))
      
      setSuccess('✅ Registro completo. Ya podés iniciar sesión con CUIT y contraseña.')
      setTimeout(() => {
        navigate('/login/empresa')
      }, 2000)
    } catch (err) {
      setError('Error al finalizar el registro')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-12 w-auto" src={utnLogo} alt="UTN Logo" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {step === 'form' && 'Registro de Empresa'}
            {step === 'verification' && 'Verificación de Email'}
            {step === 'password' && 'Crear Contraseña'}
          </h2>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleInitialSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-2">
              <input
                type="text"
                name="razonSocial"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Razón Social *"
                value={formData.razonSocial}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cuit"
                required
                pattern="[0-9]{11}"
                title="El CUIT debe tener 11 dígitos"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="CUIT (11 dígitos) *"
                value={formData.cuit}
                onChange={handleChange}
              />
              <input
                type="text"
                name="rubro"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Rubro o Actividad Principal *"
                value={formData.rubro}
                onChange={handleChange}
              />
              <input
                type="text"
                name="domicilio"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Domicilio Legal *"
                value={formData.domicilio}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="telefono"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Teléfono de Contacto *"
                value={formData.telefono}
                onChange={handleChange}
              />
              <input
                type="text"
                name="referente"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nombre del Referente Responsable *"
                value={formData.referente}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cargo"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Cargo *"
                value={formData.cargo}
                onChange={handleChange}
              />
              <input
                type="text"
                name="ubicacion"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Ubicación del Lugar de Trabajo *"
                value={formData.ubicacion}
                onChange={handleChange}
              />
              <input
                type="url"
                name="sitioWeb"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Sitio Web (opcional)"
                value={formData.sitioWeb}
                onChange={handleChange}
              />
              <input
                type="text"
                name="redesSociales"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Redes Sociales (opcional)"
                value={formData.redesSociales}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continuar
            </button>
          </form>
        )}

        {step === 'verification' && (
          <form onSubmit={handleVerificationSubmit} className="mt-8 space-y-6">
            <div className="text-center mb-4">
              <p className="text-gray-600">✉️ Te enviamos un código a tu correo. Ingresalo para verificar tu identidad.</p>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Código de verificación"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Verificar
            </button>
          </form>
        )}

        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="password"
                name="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-sm text-gray-600">
              <p>La contraseña debe tener:</p>
              <ul className="list-disc list-inside">
                <li>Al menos 8 caracteres</li>
                <li>Mayúsculas y minúsculas</li>
                <li>Números</li>
                <li>Caracteres especiales</li>
              </ul>
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Finalizar Registro
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default RegisterForm