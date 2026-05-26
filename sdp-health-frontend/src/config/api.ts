const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('sdp_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error de red' }));
    throw new Error(errorData.message || `Error HTTP: ${response.status}`);
  }
  
  return response.json();
};