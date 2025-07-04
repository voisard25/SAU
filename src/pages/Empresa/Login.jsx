import AuthForm from '../../components/AuthForm'
import fondo from '../../assets/fondo.png'

const EmpresaLogin = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10">
        <AuthForm userType="empresa" />
      </div>
    </div>
  )
}

export default EmpresaLogin