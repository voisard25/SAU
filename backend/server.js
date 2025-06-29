import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import { getSendGridStatus } from './config/sendgrid.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // URL de tu frontend Vite
}));

app.use(express.json());

app.use('/api', authRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error('❌ Error del servidor:', err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 3000;

// Función para mostrar información de configuración
const showConfigurationInfo = () => {
  console.log('\n🚀 Configuración del servidor:');
  console.log(`📍 Puerto: ${PORT}`);
  console.log(`🌐 Frontend URL: http://localhost:5173`);
  
  // Verificar variables de entorno críticas
  const requiredEnvVars = ['SENDGRID_API_KEY', 'SENDGRID_FROM_EMAIL'];
  console.log('\n📋 Variables de entorno:');
  
  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      const maskedValue = varName.includes('API_KEY') 
        ? `${value.substring(0, 10)}...${value.substring(value.length - 4)}`
        : value;
      console.log(`✅ ${varName}: ${maskedValue}`);
    } else {
      console.log(`❌ ${varName}: No configurada`);
    }
  });
  
  // Mostrar estado de SendGrid
  const sendGridStatus = getSendGridStatus();
  console.log('\n📧 Estado de SendGrid:');
  console.log(`   Configurado: ${sendGridStatus.configured ? '✅' : '❌'}`);
  console.log(`   API Key presente: ${sendGridStatus.apiKeyPresent ? '✅' : '❌'}`);
  console.log(`   API Key válida: ${sendGridStatus.apiKeyValid ? '✅' : '❌'}`);
  console.log(`   Email de origen: ${sendGridStatus.fromEmailPresent ? '✅' : '❌'}`);
  
  if (!sendGridStatus.configured) {
    console.log('\n⚠️  Advertencias:');
    if (!sendGridStatus.apiKeyPresent) {
      console.log('   • SENDGRID_API_KEY no está configurada');
    }
    if (!sendGridStatus.apiKeyValid) {
      console.log('   • SENDGRID_API_KEY no tiene el formato correcto (debe comenzar con "SG.")');
    }
    if (!sendGridStatus.fromEmailPresent) {
      console.log('   • SENDGRID_FROM_EMAIL no está configurada');
    }
    console.log('   • Los emails se simularán hasta que SendGrid esté configurado correctamente');
  }
  
  console.log('\n🔗 Endpoints disponibles:');
  console.log('   • POST /api/verificacion/enviar-codigo - Enviar código de verificación');
  console.log('   • GET  /api/sendgrid/status - Verificar estado de SendGrid');
  console.log('\n✨ Servidor listo para recibir conexiones!\n');
};

app.listen(PORT, () => {
  console.log(`\n🎯 Servidor corriendo en puerto ${PORT}`);
  showConfigurationInfo();
});