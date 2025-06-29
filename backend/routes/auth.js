import express from 'express';
import { sendVerificationEmail, getSendGridStatusController } from '../controllers/authController.js';

const router = express.Router();

// Endpoint para enviar código de verificación
router.post('/verificacion/enviar-codigo', sendVerificationEmail);

// Endpoint para verificar el estado de SendGrid
router.get('/sendgrid/status', getSendGridStatusController);

export default router;