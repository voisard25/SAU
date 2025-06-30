Documentación del progreso(avance y detalles del proyecto):
https://drive.google.com/drive/folders/1XiUrTXp6bZn2uX532_wu0UFv0qQRGJuN
# 📚 Sistema de Gestión de Pasantías 
## 🔐 Credenciales de acceso  

👨‍🎓 **Estudiante**  
- Usuario (Legajo): `87543`  
- Contraseña: `40256987`  

🏢 **Empresa**  
- Usuario (CUIT): `30709999211`  
- Contraseña: `Empresa123`  

🧑‍💼 **Agente SAU (Administrador)**  
- Usuario: `admi`  
- Contraseña: `admi123`  

---

## ⚙️ Funcionalidades destacadas

### ✅ Validación de correo electrónico con SendGrid  
Durante el proceso de **registro de empresas**, se incluye una verificación por correo electrónico.  
El sistema envía un **código de verificación** simulado mediante el servicio de **SendGrid**.  
> ⚠️ Para que el envío funcione correctamente, es necesario ejecutar las siguientes variables de entorno en la terminal:

**En PowerShell (Windows):**
```powershell
$Env:SENDGRID_API_KEY="api_key_aqui"
$Env:SENDGRID_FROM_EMAIL="pasantiasutnsau@gmail.com"
En Git Bash / Linux / macOS:
export SENDGRID_API_KEY="api_key_aqui"
export SENDGRID_FROM_EMAIL="pasantiasutnsau@gmail.com"


 
