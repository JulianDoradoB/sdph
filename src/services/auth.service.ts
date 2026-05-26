import { User } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors';

export class AuthService {
  public static generateToken(id: string, role: string): string {
    return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  }
}