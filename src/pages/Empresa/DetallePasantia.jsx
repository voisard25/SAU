import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const DetallePasantia = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pasantia, setPasantia] = useState(null)

    useEffect(() => {
        const pasantiasGuardadas = JSON.parse(localStorage.getItem('pasantias') || '[]')
        const pasantiaEncontrada = pasantiasGuardadas.find(p => p.id === Number(id))
        setPasantia(pasantiaEncontrada)
    }, [id])

    if (!pasantia) {
        return <div className="p-8 text-center">Cargando...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold mb-6">{pasantia.titulo}</h1>
                    
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold mb-3">Información General</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">Área</p>
                                    <p className="font-medium">{pasantia.area}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Vacantes</p>
                                    <p className="font-medium">{pasantia.cantidadVacantes}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Modalidad</p>
                                    <p className="font-medium">{pasantia.modalidad}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Ubicación</p>
                                    <p className="font-medium">{pasantia.ubicacion}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Descripción</h2>
                            <p className="text-gray-800">{pasantia.descripcion}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Duración y Horarios</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600">Duración</p>
                                    <p className="font-medium">{pasantia.duracion}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Horas por semana</p>
                                    <p className="font-medium">{pasantia.horasPorSemana}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Horarios estimados</p>
                                    <p className="font-medium">{pasantia.horariosEstimados}</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-3">Requisitos</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-600">Carrera</p>
                                    <p className="font-medium">{pasantia.requisitos.carrera.valor}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Año cursado</p>
                                    <p className="font-medium">{pasantia.requisitos.anoCursado.valor}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Experiencia</p>
                                    <p className="font-medium">{pasantia.requisitos.experiencia.valor}</p>
                                </div>
                            </div>
                        </section>

                        <div className="pt-6">
                            <button
                                onClick={() => navigate('/empresa')}
                                className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetallePasantia