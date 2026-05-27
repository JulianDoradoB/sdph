import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'medico'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al procesar el registro clínico.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col justify-start p-6 font-sans">
      <div className="max-w-md w-full mx-auto mt-4 space-y-5">
        
        {/* Isotipo: Línea de Pulso Clínico */}
        <div className="text-white">
          <svg className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>

        {/* Títulos principales */}
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold tracking-tight text-white">SDP-HEALTH</h1>
          <p className="text-xs text-gray-300 font-medium">Plataforma de Control Hospitalario y Triage</p>
        </div>

        {/* Alertas de Feedback */}
        {error && (
          <div className="bg-red-500/10 border border-red-600 text-red-500 p-2 rounded text-xs">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-600 text-green-400 p-2 rounded text-xs">
            ✔ Personal registrado de forma exitosa. Redirigiendo...
          </div>
        )}

        {/* Estructura del Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input: Nombre Completo */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-200">Nombre Completo Autorizado</label>
            <input 
              type="text" 
              name="name"
              required
              className="w-full max-w-[280px] px-2 py-1 bg-white text-black text-xs font-medium border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange} 
              value={formData.name}
            />
          </div>

          {/* Input: Correo Electrónico */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-200">Correo Electrónico Autorizado</label>
            <div className="relative max-w-[280px]">
              <input 
                type="email" 
                name="email"
                required
                placeholder="medico@hospital.com"
                className="w-full px-2 py-1 bg-white text-black text-xs font-medium border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-blue-500 pr-8 placeholder:text-gray-400"
                onChange={handleChange} 
                value={formData.email}
              />
              <div className="absolute right-2.5 top-1.5 text-black pointer-events-none">
                <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Input: Contraseña */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-200">Contraseña de Seguridad</label>
            <div className="relative max-w-[280px]">
              <input 
                type="password" 
                name="password"
                required
                className="w-full px-2 py-1 bg-white text-black text-xs border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-blue-500 pr-8"
                onChange={handleChange} 
                value={formData.password}
              />
              <div className="absolute right-2.5 top-1.5 text-black pointer-events-none">
                <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Input: Selector de Rol Clínico */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-200">Rol Clínico Asignado</label>
            <select 
              name="role" 
              className="w-full max-w-[280px] px-1.5 py-1 bg-white text-black text-xs font-medium border border-gray-300 rounded-sm outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="medico">Médico</option>
              <option value="enfermero">Enfermero/a</option>
              <option value="administrador">Administrador</option>
            </select>
          </div>
          
          {/* Botón de envío */}
          <div className="pt-1">
            <button 
              type="submit" 
              disabled={success}
              className="bg-gray-100 hover:bg-white text-black text-xs font-medium px-3 py-1 rounded-sm border border-gray-400 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
            >
              {success ? 'Procesando...' : 'Autenticar Acceso Clínico'}
            </button>
          </div>
        </form>

        {/* Enlaces inferiores */}
        <div className="pt-4 border-t border-gray-800/60 max-w-[320px] space-y-1.5">
          <p className="text-[11px] text-gray-400 font-medium">
            Sistema Encriptado · Conforme a Estándares de Seguridad Médica
          </p>
          <div>
            <Link to="/login" className="text-[11px] text-blue-400 hover:underline transition-colors">
              ¿Ya posees una cuenta autorizada? Iniciar Sesión
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};