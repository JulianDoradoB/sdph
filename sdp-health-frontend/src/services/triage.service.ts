import { apiFetch } from '../config/api';
import { TriageStatus } from '../types';

export const triageService = {
  create: async (triageData: any) => {
    return apiFetch('/triages', {
      method: 'POST',
      body: JSON.stringify(triageData)
    });
  },
  getQueue: async () => {
    return apiFetch('/triages/queue');
  },
  updateStatus: async (id: string, status: TriageStatus) => {
    return apiFetch(`/triages/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },
  createPrescription: async (prescriptionData: any) => {
    return apiFetch('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData)
    });
  }
};