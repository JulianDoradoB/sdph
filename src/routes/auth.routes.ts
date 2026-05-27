import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validate.middleware';
import { z } from 'zod';
import { UserRole } from '../constants/triage';

const router = Router();

// Esquema de validación estricto para el registro de nuevos usuarios médicos
const registerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres.' }),
  email: z.string().email({ message: 'Debe ingresar un formato de correo válido.' }),
  password: z.string().min(6, { message: 'La contraseña requiere un mínimo de 6 caracteres.' }),
  role: z.nativeEnum(UserRole, { 
    errorMap: () => ({ message: 'El rol clínico proporcionado no coincide con los niveles de acceso autorizados.' }) 
  })
});

// Esquema de validación para la autenticación de acceso (Login)
const loginSchema = z.object({
  email: z.string().email({ message: 'Formato de correo inválido.' }),
  password: z.string().min(1, { message: 'La contraseña es obligatoria.' })
});

// Endpoint para registrar nuevos usuarios en la base de datos (con validación de cuerpo)
router.post('/register', validateBody(registerSchema), AuthController.register);

// Endpoint para el inicio de sesión (con validación de cuerpo)
router.post('/login', validateBody(loginSchema), AuthController.login);

export default router;