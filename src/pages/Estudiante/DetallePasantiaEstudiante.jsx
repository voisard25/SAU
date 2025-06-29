import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const DetallePasantiaEstudiante = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pasantia, setPasantia] = useState(null)

    useEffect(() => {
        const pasantiasGuardadas = JSON.parse(localStorage.getItem('pasantias') || '[]')
        const pasantiaEncontrada = pasantiasGuardadas.find(p => p.id === Number(id))
        setPasantia(pasantiaEncontrada)
    }, [id])

    if (!pasantia) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600 text-lg">Cargando detalles de la pasantía...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">{pasantia.titulo}</h1>
                        
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Información de la Empresa</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-600">Empresa: <span className="text-gray-900 font-medium">{pasantia.empresa}</span></p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Detalles de la Pasantía</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-gray-600">Área: <span className="text-gray-900 font-medium">{pasantia.area}</span></p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Modalidad: <span className="text-gray-900 font-medium">{pasantia.modalidad}</span></p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Ubicación: <span className="text-gray-900 font-medium">{pasantia.ubicacion}</span></p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Vacantes: <span className="text-gray-900 font-medium">{pasantia.cantidadVacantes}</span></p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descripción</h2>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-800">{pasantia.descripcion}</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Horarios y Duración</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-gray-600">Duración: <span className="text-gray-900 font-medium">{pasantia.duracion}</span></p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Horas por semana: <span className="text-gray-900 font-medium">{pasantia.horasPorSemana}</span></p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-600">Horarios estimados: <span className="text-gray-900 font-medium">{pasantia.horariosEstimados}</span></p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
                                <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-gray-600">Carrera requerida: 
                                            <span className="text-gray-900 font-medium">{pasantia.requisitos.carrera.valor}</span>
                                            {pasantia.requisitos.carrera.obligatorio && <span className="text-red-500 ml-2">(Obligatorio)</span>}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Año cursado: 
                                            <span className="text-gray-900 font-medium">{pasantia.requisitos.anoCursado.valor}</span>
                                            {pasantia.requisitos.anoCursado.obligatorio && <span className="text-red-500 ml-2">(Obligatorio)</span>}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Experiencia: 
                                            <span className="text-gray-900 font-medium">{pasantia.requisitos.experiencia.valor}</span>
                                            {pasantia.requisitos.experiencia.obligatorio && <span className="text-red-500 ml-2">(Obligatorio)</span>}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="flex justify-end space-x-4 pt-6">
                                <button
                                    onClick={() => navigate('/estudiante')}
                                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Volver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallePasantiaEstudiante