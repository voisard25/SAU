import fondo from '../../assets/fondo.png'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-white text-center p-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">Pasantías Universitarias</h1>
        
        <div className="mb-8 text-left bg-black/70 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">¿Qué son las Pasantías Universitarias?</h2>
          <p className="mb-6">Son experiencias prácticas rentadas, las cuales tienen afinidad con las carreras dictadas en UTN.</p>
          
          <h3 className="text-xl font-semibold mb-2">Objetivos</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Profundizar la valorización del trabajo.</li>
            <li>Incorporar saberes, habilidades y aptitudes.</li>
            <li>Vínculo entre la institución educativa y organismos o empresas.</li>
          </ul>
          
          <h3 className="text-xl font-semibold mb-2">¿Qué beneficios tiene participar del Programa de Pasantías Universitarias?</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Aplicación práctica de competencias.</li>
            <li>Conocer el campo específico que le interesa al estudiante.</li>
            <li>Facilitar la transición entre la etapa universitaria y laboral.</li>
            <li>Integración en grupos laborales.</li>
            <li>Concientizar sobre los derechos laborales.</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link 
            to="/admin/login" 
            className="w-48 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300"
          >
            Administrador
          </Link>
          <Link 
            to="/empresa/login" 
            className="w-48 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300"
          >
            Empresa
          </Link>
          <Link 
            to="/estudiante/login" 
            className="w-48 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition duration-300"
          >
            Estudiante
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing