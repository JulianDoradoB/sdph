import jwt, { SignOptions } from 'jsonwebtoken';

export class AuthService {
  /**
   * Genera un JSON Web Token firmado para la sesión del usuario
   * @param id Identificador único del usuario (UUID o ID numérico)
   * @param role Rol asignado en el sistema
   */
  public static generateToken(id: string, role: string): string {
    // 1. Asegurar que el SECRET exista y sea tratado como un string puro
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';

    // 2. Definir las opciones tipando estrictamente el formato de expiración
    const options: SignOptions = {
      expiresIn: (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '24h'
    };

    // 3. Realizar la firma con los parámetros correctamente casteados
    return jwt.sign({ id, role }, secret, options);
  }
}