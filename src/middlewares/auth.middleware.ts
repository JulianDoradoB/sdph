import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors';
import { UserRole } from '../constants/triage';

export interface AuthRequest extends Request {
  user?: { id: string; role: UserRole };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError(401, 'No estás autenticado. Token faltante.'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: UserRole };
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, 'Token inválido o expirado.'));
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
       next(new AppError(403, 'No tienes permisos para realizar esta acción.'));
       return;
    }
    next();
  };
};