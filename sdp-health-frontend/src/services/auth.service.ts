import { apiFetch } from '../config/api';

export const authService = {
  login: async (credentials: any) => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }
};