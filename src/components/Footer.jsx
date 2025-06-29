import sauLogo from '../assets/sau.png'

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 py-8">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <img src={sauLogo} alt="SAU Logo" className="h-24 mb-6" />
                <div className="text-center">
                    <p>Av. de la Universidad 501</p>
                    <p>(2400) San Francisco</p>
                    <p>Córdoba - República Argentina</p>
                    <p>Tel. (03564) 421147 / 435402</p>
                    <p>sau@facultad.sanfrancisco.utn.edu.ar</p>
                    <p>sau.utnsanfco@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer