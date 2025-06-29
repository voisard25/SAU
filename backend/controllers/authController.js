import { sendVerificationCode, getSendGridStatus } from '../config/sendgrid.js';

export const sendVerificationEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Validaciones
    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'El email y el código son requeridos'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El formato del email no es válido'
      });
    }

    if (!/^\d{6}$/.test(code)) {
      return res.status(400).json({
        success: false,
        message: 'El código debe ser numérico de 6 dígitos'
      });
    }

    // Verificar estado de SendGrid antes de intentar enviar
    const sendGridStatus = getSendGridStatus();
    
    if (!sendGridStatus.configured) {
      console.warn('⚠️  Intentando enviar email sin SendGrid configurado');
      
      // Si no está configurado, devolver información útil
      return res.status(200).json({
        success: true,
        message: 'Código de verificación simulado (SendGrid no configurado)',
        simulated: true,
        sendGridStatus
      });
    }

    // Enviar el código
    const result = await sendVerificationCode(email, code);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: 'Error al enviar el código de verificación',
        error: result.error,
        sendGridStatus
      });
    }

    res.status(200).json({
      success: true,
      message: result.simulated ? 'Código de verificación simulado' : 'Código de verificación enviado exitosamente',
      simulated: result.simulated || false
    });

  } catch (error) {
    console.error('❌ Error en sendVerificationEmail:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Endpoint para verificar el estado de SendGrid
export const getSendGridStatusController = (req, res) => {
  try {
    const status = getSendGridStatus();
    
    res.status(200).json({
      success: true,
      sendGridStatus: status,
      message: status.configured 
        ? 'SendGrid está configurado correctamente' 
        : 'SendGrid no está configurado correctamente'
    });
  } catch (error) {
    console.error('❌ Error al obtener estado de SendGrid:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar estado de SendGrid',
      error: error.message
    });
  }
};