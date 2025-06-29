import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CrearPasantia = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        // Datos sobre la forma de la pasantía
        titulo: '',
        descripcion: '',
        area: '',
        cantidadVacantes: '',
        fechaInicio: '',
        fechaFin: '',
        remuneracion: '',
        modalidad: '',
        ubicacion: '',
        duracion: '',
        horasPorSemana: '',
        horariosEstimados: '',
        tareasRealizar: '',

        // Requisitos de la pasantía
        requisitos: {
            carrera: {
                valor: '',
                obligatorio: false
            },
            anoCursado: {
                valor: '',
                obligatorio: false
            },
            habilidadesBlandas: {
                valores: [],
                obligatorio: false
            },
            habilidadesTecnicas: {
                valores: [],
                obligatorio: false
            },
            experiencia: {
                valor: '',
                obligatorio: false
            },
            idiomas: {
                valores: [],
                obligatorio: false
            }
        }
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        
        if (name.startsWith('requisitos.')) {
            const [, campo, propiedad] = name.split('.')
            setFormData(prev => ({
                ...prev,
                requisitos: {
                    ...prev.requisitos,
                    [campo]: {
                        ...prev.requisitos[campo],
                        [propiedad]: type === 'checkbox' ? checked : value
                    }
                }
            }))
        } else if (name === 'cantidadVacantes' || name === 'remuneracion') {
            // Validación para números positivos mayores a cero
            const numValue = Number(value)
            if (value === '' || (numValue > 0)) {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }))
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        // Validación antes de enviar
        const cantidadVacantes = Number(formData.cantidadVacantes)
        const remuneracion = Number(formData.remuneracion)
        
        if (cantidadVacantes <= 0) {
            alert('La cantidad de vacantes debe ser mayor a cero')
            return
        }
        
        if (remuneracion <= 0) {
            alert('La remuneración debe ser mayor a cero')
            return
        }
        
        // Crear objeto de pasantía
        const nuevaPasantia = {
            id: Date.now(), // ID temporal
            ...formData,
            estado: 'activa'
        }

        // Aquí deberías hacer la llamada a tu API para guardar la pasantía
        // Por ahora, simularemos guardando en localStorage
        const pasantiasGuardadas = JSON.parse(localStorage.getItem('pasantias') || '[]')
        pasantiasGuardadas.push(nuevaPasantia)
        localStorage.setItem('pasantias', JSON.stringify(pasantiasGuardadas))

        // Redirigir al dashboard
        navigate('/empresa')
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
                <h1 className="text-2xl font-bold mb-6">Crear Nueva Pasantía</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sección: Datos de la pasantía */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Datos de la Pasantía</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Título del Puesto</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área</label>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Descripción General</label>
                                <textarea
                                    name="descripcion"
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Cantidad de Vacantes</label>
                                <input
                                    type="number"
                                    name="cantidadVacantes"
                                    value={formData.cantidadVacantes}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Remuneración</label>
                                <input
                                    type="number"
                                    name="remuneracion"
                                    value={formData.remuneracion}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                                <input
                                    type="date"
                                    name="fechaInicio"
                                    value={formData.fechaInicio}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
                                <input
                                    type="date"
                                    name="fechaFin"
                                    value={formData.fechaFin}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Modalidad</label>
                                <select
                                    name="modalidad"
                                    value={formData.modalidad}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="presencial">Presencial</option>
                                    <option value="remoto">Remoto</option>
                                    <option value="hibrido">Híbrido</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                                <input
                                    type="text"
                                    name="ubicacion"
                                    value={formData.ubicacion}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Horas por Semana</label>
                                <input
                                    type="number"
                                    name="horasPorSemana"
                                    value={formData.horasPorSemana}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Horarios Estimados</label>
                                <input
                                    type="text"
                                    name="horariosEstimados"
                                    value={formData.horariosEstimados}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="ej: Lunes a Viernes 9-13hs"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Tareas a Realizar</label>
                                <textarea
                                    name="tareasRealizar"
                                    value={formData.tareasRealizar}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección: Requisitos */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Requisitos</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Carrera</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        name="requisitos.carrera.valor"
                                        value={formData.requisitos.carrera.valor}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="requisitos.carrera.obligatorio"
                                            checked={formData.requisitos.carrera.obligatorio}
                                            onChange={handleChange}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Requerido</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Año de Cursado</label>
                                <div className="flex items-center space-x-2">
                                    <select
                                        name="requisitos.anoCursado.valor"
                                        value={formData.requisitos.anoCursado.valor}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="1">1er año</option>
                                        <option value="2">2do año</option>
                                        <option value="3">3er año</option>
                                        <option value="4">4to año</option>
                                        <option value="5">5to año</option>
                                    </select>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="requisitos.anoCursado.obligatorio"
                                            checked={formData.requisitos.anoCursado.obligatorio}
                                            onChange={handleChange}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Requerido</span>
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Habilidades Blandas</label>
                                <div className="mt-2 space-y-2">
                                    {['Comunicación', 'Trabajo en equipo', 'Liderazgo', 'Resolución de problemas', 'Adaptabilidad'].map((habilidad) => (
                                        <label key={habilidad} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                name={`requisitos.habilidadesBlandas.valores`}
                                                value={habilidad}
                                                checked={formData.requisitos.habilidadesBlandas.valores.includes(habilidad)}
                                                onChange={(e) => {
                                                    const newHabilidades = e.target.checked
                                                        ? [...formData.requisitos.habilidadesBlandas.valores, habilidad]
                                                        : formData.requisitos.habilidadesBlandas.valores.filter(h => h !== habilidad)
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        requisitos: {
                                                            ...prev.requisitos,
                                                            habilidadesBlandas: {
                                                                ...prev.requisitos.habilidadesBlandas,
                                                                valores: newHabilidades
                                                            }
                                                        }
                                                    }))
                                                }}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{habilidad}</span>
                                        </label>
                                    ))}
                                </div>
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        name="requisitos.habilidadesBlandas.obligatorio"
                                        checked={formData.requisitos.habilidadesBlandas.obligatorio}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Requerido</span>
                                </label>
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Habilidades Técnicas</label>
                                <div className="mt-2 space-y-2">
                                    {['Programación', 'Base de datos', 'Redes', 'Diseño web', 'Testing'].map((habilidad) => (
                                        <label key={habilidad} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                name={`requisitos.habilidadesTecnicas.valores`}
                                                value={habilidad}
                                                checked={formData.requisitos.habilidadesTecnicas.valores.includes(habilidad)}
                                                onChange={(e) => {
                                                    const newHabilidades = e.target.checked
                                                        ? [...formData.requisitos.habilidadesTecnicas.valores, habilidad]
                                                        : formData.requisitos.habilidadesTecnicas.valores.filter(h => h !== habilidad)
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        requisitos: {
                                                            ...prev.requisitos,
                                                            habilidadesTecnicas: {
                                                                ...prev.requisitos.habilidadesTecnicas,
                                                                valores: newHabilidades
                                                            }
                                                        }
                                                    }))
                                                }}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{habilidad}</span>
                                        </label>
                                    ))}
                                </div>
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        name="requisitos.habilidadesTecnicas.obligatorio"
                                        checked={formData.requisitos.habilidadesTecnicas.obligatorio}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Requerido</span>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Experiencia</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        name="requisitos.experiencia.valor"
                                        value={formData.requisitos.experiencia.valor}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="ej: 1 año en desarrollo web"
                                    />
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            name="requisitos.experiencia.obligatorio"
                                            checked={formData.requisitos.experiencia.obligatorio}
                                            onChange={handleChange}
                                            className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Requerido</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Idiomas</label>
                                <div className="mt-2 space-y-2">
                                    {['Inglés', 'Portugués', 'Francés', 'Alemán'].map((idioma) => (
                                        <label key={idioma} className="inline-flex items-center mr-4">
                                            <input
                                                type="checkbox"
                                                name={`requisitos.idiomas.valores`}
                                                value={idioma}
                                                checked={formData.requisitos.idiomas.valores.includes(idioma)}
                                                onChange={(e) => {
                                                    const newIdiomas = e.target.checked
                                                        ? [...formData.requisitos.idiomas.valores, idioma]
                                                        : formData.requisitos.idiomas.valores.filter(i => i !== idioma)
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        requisitos: {
                                                            ...prev.requisitos,
                                                            idiomas: {
                                                                ...prev.requisitos.idiomas,
                                                                valores: newIdiomas
                                                            }
                                                        }
                                                    }))
                                                }}
                                                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-600">{idioma}</span>
                                        </label>
                                    ))}
                                </div>
                                <label className="inline-flex items-center mt-2">
                                    <input
                                        type="checkbox"
                                        name="requisitos.idiomas.obligatorio"
                                        checked={formData.requisitos.idiomas.obligatorio}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Requerido</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/empresa')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Crear Pasantía
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CrearPasantia