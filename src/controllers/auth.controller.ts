import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { AppError } from '../utils/errors';

export class AuthController {
  public static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
      const exists = await User.findOne({ where: { email } });
      if (exists) return next(new AppError(400, 'El email ya está registrado.'));

      const user = await User.create({ name, email, password, role });
      const token = AuthService.generateToken(user.id, user.role);

      res.status(201).json({ status: 'success', token, data: { id: user.id, name: user.name, role: user.role } });
    } catch (e) { next(e); }
  }

  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user || !(await user.validatePassword(password))) {
        return next(new AppError(401, 'Credenciales incorrectas.'));
      }

      const token = AuthService.generateToken(user.id, user.role);
      res.status(200).json({ status: 'success', token, data: { id: user.id, name: user.name, role: user.role } });
    } catch (e) { next(e); }
  }
}