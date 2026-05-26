import { apiFetch } from '../config/api';

export const patientService = {
  create: async (patientData: any) => {
    return apiFetch('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData)
    });
  },
  getByDni: async (dni: string) => {
    return apiFetch(`/patients/${dni}`);
  }
};