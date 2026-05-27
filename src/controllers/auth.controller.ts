import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/errors';

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
      
      // Verificar si el usuario ya existe en la base de datos
      const exists = await User.findOne({ where: { email } });
      if (exists) {
        return next(new AppError(400, 'El email ya está registrado.'));
      }

      // Crear el nuevo usuario (Sequelize se encarga de aplicar los hooks de encriptación si los tienes en el modelo)
      const user = await User.create({ name, email, password, role });
      
      // Generar el token firmado usando el servicio de autenticación
      const token = AuthService.generateToken(user.id, user.role);

      // Responder al frontend con el token y la información pública del usuario
      res.status(201).json({ 
        status: 'success', 
        token, 
        data: { 
          id: user.id, 
          name: user.name, 
          role: user.role 
        } 
      });
    } catch (e) { 
      next(e); 
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      
      // Buscar al usuario por correo electrónico
      const user = await User.findOne({ where: { email } });
      
      // Validar la existencia del usuario y verificar su contraseña
      if (!user || !(await user.validatePassword(password))) {
        return next(new AppError(401, 'Credenciales incorrectas.'));
      }

      // Generar el token de acceso
      const token = AuthService.generateToken(user.id, user.role);
      
      // Responder al frontend con la sesión iniciada correctamente
      res.status(200).json({ 
        status: 'success', 
        token, 
        data: { 
          id: user.id, 
          name: user.name, 
          role: user.role 
        } 
      });
    } catch (e) { 
      next(e); 
    }
  }
}