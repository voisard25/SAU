import sgMail from '@sendgrid/mail';
import 'dotenv/config'; 

console.log('API Key:', process.env.SENDGRID_API_KEY?.slice(0, 10), '...');
console.log('From Email:', process.env.SENDGRID_FROM_EMAIL);

// Validar que la API key esté presente y tenga el formato correcto
const validateApiKey = () => {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    console.warn('⚠️  SENDGRID_API_KEY no está configurada en las variables de entorno');
    return false;
  }
  
  if (!apiKey.startsWith('SG.')) {
    console.error('❌ SENDGRID_API_KEY no tiene el formato correcto. Debe comenzar con "SG."');
    return false;
  }
  if (apiKey.length < 50) {
    console.warn('⚠️ SENDGRID_API_KEY es más corta de lo habitual, pero puede seguir siendo válida');
  }
  console.log('✅ SENDGRID_API_KEY configurada correctamente');
  return true;
};

// Configurar SendGrid solo si la API key es válida
let isSendGridConfigured = false;

try {
  if (validateApiKey()) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    isSendGridConfigured = true;
  }
} catch (error) {
  console.error('❌ Error al configurar SendGrid:', error.message);
  isSendGridConfigured = false;
}

// Plantilla del email de verificación
const createVerificationEmail = (code) => ({
  subject: 'Verificación de email para registro de empresa',
  text: `Tu código de verificación es: ${code}\n\nEste código expirará en 10 minutos.`,
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Verificación de Email</h2>
      <p>Tu código de verificación es:</p>
      <h1 style="color: #4A90E2; font-size: 32px;">${code}</h1>
      <p>Este código expirará en 10 minutos.</p>
    </div>
  `
});

// Función para enviar el código de verificación
export const sendVerificationCode = async (email, code) => {
  // Verificar si SendGrid está configurado
  if (!isSendGridConfigured) {
    console.warn('⚠️  SendGrid no está configurado. Simulando envío de email...');
    return { 
      success: true, 
      message: 'Email simulado (SendGrid no configurado)',
      simulated: true
    };
  }

  // Verificar que el email de origen esté configurado
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  if (!fromEmail) {
    console.error('❌ SENDGRID_FROM_EMAIL no está configurado');
    return { 
      success: false, 
      error: 'Email de origen no configurado'
    };
  }

  try {
    const { subject, text, html } = createVerificationEmail(code);
    
    const msg = {
      to: email,
      from: fromEmail,
      subject,
      text,
      html
    };

    console.log(`📧 Enviando email de verificación a: ${email}`);
    await sgMail.send(msg);
    console.log('✅ Email enviado exitosamente');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error al enviar código de verificación:', error);
    
    // Manejar errores específicos de SendGrid
    if (error.response) {
      const { body } = error.response;
      console.error('Detalles del error SendGrid:', body);
      
      if (body && body.errors) {
        const errorMessage = body.errors[0]?.message || 'Error desconocido de SendGrid';
        return { 
          success: false, 
          error: errorMessage
        };
      }
    }
    
    return { 
      success: false, 
      error: error.message || 'Error al enviar el email'
    };
  }
};

// Función para verificar el estado de la configuración
export const getSendGridStatus = () => {
  return {
    configured: isSendGridConfigured,
    apiKeyPresent: !!process.env.SENDGRID_API_KEY,
    apiKeyValid: process.env.SENDGRID_API_KEY?.startsWith('SG.'),
    fromEmailPresent: !!process.env.SENDGRID_FROM_EMAIL
  };
};