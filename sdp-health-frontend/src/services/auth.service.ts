import { apiFetch } from '../config/api';

export const authService = {
  /**
   * Envía las credenciales (email y password) al backend para iniciar sesión
   */
  login: async (credentials: any): Promise<any> => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  /**
   * Envía los datos del nuevo usuario (name, email, password, role) para guardarlo en la base de datos
   */
  register: async (userData: any): Promise<any> => {
    return apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }
};