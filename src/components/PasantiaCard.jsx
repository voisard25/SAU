import React from 'react'

const PasantiaCard = ({ pasantia, onVerDetalles, onPostular, onEliminar, showPostularButton = true, showEliminarButton = false }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
                {/* Placeholder para imagen/logo */}
                <div className="w-32 h-32 border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400">Logo</span>
                </div>
            </div>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{pasantia.titulo}</h2>
                <p className="text-gray-600 mb-4">{pasantia.empresa}</p>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => onVerDetalles(pasantia.id)}
                        className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Ver detalles
                    </button>
                    {showPostularButton && (
                        <button
                            onClick={() => onPostular(pasantia.id)}
                            className="w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Postularme
                        </button>
                    )}
                    {showEliminarButton && (
                        <button
                            onClick={() => onEliminar(pasantia.id)}
                            className="w-full px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Eliminar pasantía
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PasantiaCard