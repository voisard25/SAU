import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PasantiaCard from '../../components/PasantiaCard'

const OfertasPasantias = () => {
    const navigate = useNavigate()
    const [pasantias, setPasantias] = useState([])
    const [postulaciones, setPostulaciones] = useState({})

    useEffect(() => {
        // Cargar las pasantías del localStorage
        const pasantiasGuardadas = JSON.parse(localStorage.getItem('pasantias') || '[]')
        setPasantias(pasantiasGuardadas)
        
        // Cargar las postulaciones guardadas
        const postulacionesGuardadas = JSON.parse(localStorage.getItem('postulaciones') || '{}')
        setPostulaciones(postulacionesGuardadas)
    }, [])

    const handleVerDetalles = (id) => {
        navigate(`/estudiante/pasantia/${id}`)
    }

    const handlePostular = (id) => {
        setPostulaciones(prev => {
            const nuevasPostulaciones = {
                ...prev,
                [id]: !prev[id]
            }
            // Guardar en localStorage
            localStorage.setItem('postulaciones', JSON.stringify(nuevasPostulaciones))
            return nuevasPostulaciones
        })
    }

    if (pasantias.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg">No hay pasantías disponibles en este momento.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pasantias.map((pasantia) => (
                    <div key={pasantia.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-2">{pasantia.titulo}</h2>
                            <p className="text-gray-600 mb-4">{pasantia.empresa}</p>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleVerDetalles(pasantia.id)}
                                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Ver detalles
                                </button>
                                <button
                                    onClick={() => handlePostular(pasantia.id)}
                                    className={`w-full px-4 py-2 text-white rounded-md transition-colors ${postulaciones[pasantia.id] ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {postulaciones[pasantia.id] ? 'Eliminar postulación' : 'Postularme'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OfertasPasantias