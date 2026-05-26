import React, { useState, useEffect } from 'react';
import { Activity, Mail, Lock, ChevronRight, Wifi } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await authService.login({ email, password });
      login(res.token, res.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex grid-bg"
      style={{ background: 'var(--bg-deep)' }}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Panel izquierdo — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[52%] relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(135deg, #080d14 0%, #0a1628 60%, #0d1f3c 100%)' }}
      >
        {/* Grid decorativo */}
        <div className="absolute inset-0 grid-bg opacity-60" />

        {/* Línea glow lateral derecha */}
        <div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(180deg, transparent 0%, var(--accent-cyan) 40%, transparent 100%)', opacity: 0.25 }}
        />

        {/* Círculo decorativo de fondo */}
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,200,224,0.06) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 right-8 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(26,120,255,0.05) 0%, transparent 70%)' }}
        />

        {/* Logo */}
        <div className={`relative z-10 ${mounted ? 'animate-fade-up' : 'opacity-0'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center animate-heartbeat"
              style={{
                background: 'linear-gradient(135deg, #1a78ff, #0044cc)',
                boxShadow: '0 0 24px rgba(26,120,255,0.35)'
              }}
            >
              <Activity size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-display text-lg font-800 tracking-wide" style={{ color: 'var(--text-primary)' }}>
                SDP<span style={{ color: 'var(--accent-cyan)' }}>·</span>HEALTH
              </span>
            </div>
          </div>
        </div>

        {/* Centro — tagline */}
        <div className={`relative z-10 flex-1 flex flex-col justify-center ${mounted ? 'animate-fade-up delay-100' : 'opacity-0'}`}>
          {/* ECG decorativo */}
          <div className="mb-8">
            <svg viewBox="0 0 300 60" className="w-72 h-14 opacity-40">
              <polyline
                className="ecg-path"
                points="0,30 40,30 55,30 60,10 65,50 70,30 85,30 95,30 100,5 105,55 110,30 125,30 200,30 300,30"
              />
            </svg>
          </div>

          <h1
            className="font-display text-5xl font-800 leading-tight mb-6"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
          >
            Control<br />
            <span style={{ color: 'var(--accent-cyan)' }}>Hospitalario</span><br />
            & Triage
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', maxWidth: '340px' }}>
            Plataforma de gestión clínica con clasificación Manchester en tiempo real para equipos de urgencias.
          </p>

          {/* Stats decorativos */}
          <div className="flex gap-6 mt-10">
            {[
              { value: '< 3s', label: 'Clasificación' },
              { value: '5 niveles', label: 'Manchester' },
              { value: 'HL7', label: 'Estándar' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-mono text-lg font-500"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-xs" style={{ color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className={`relative z-10 flex items-center gap-2 ${mounted ? 'animate-fade-up delay-200' : 'opacity-0'}`}
          style={{ color: 'var(--text-dim)', fontSize: '12px' }}
        >
          <Wifi size={12} />
          <span className="font-mono" style={{ letterSpacing: '0.08em' }}>
            SISTEMA ENCRIPTADO · CONFORME ESTÁNDARES SEGURIDAD MÉDICA
          </span>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div
          className={`w-full max-w-sm ${mounted ? 'animate-fade-up delay-200' : 'opacity-0'}`}
        >
          {/* Logo móvil */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a78ff, #0044cc)' }}
            >
              <Activity size={16} color="#fff" />
            </div>
            <span className="font-display text-base font-700" style={{ color: 'var(--text-primary)' }}>
              SDP·HEALTH
            </span>
          </div>

          {/* Título form */}
          <div className="mb-8">
            <div
              className="font-mono text-xs mb-3"
              style={{ color: 'var(--accent-cyan)', letterSpacing: '0.15em' }}
            >
              // ACCESO AUTORIZADO
            </div>
            <h2
              className="font-display text-3xl font-700"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}
            >
              Autenticar sesión
            </h2>
            <p className="mt-2" style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              Ingresa con tus credenciales clínicas asignadas.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="sdp-label">Correo institucional</label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--text-dim)' }}
                >
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sdp-input"
                  style={{ paddingLeft: '36px' }}
                  placeholder="medico@hospital.com"
                />
              </div>
            </div>

            <div>
              <label className="sdp-label">Contraseña de seguridad</label>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--text-dim)' }}
                >
                  <Lock size={14} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="sdp-input"
                  style={{ paddingLeft: '36px' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div
                className="animate-fade-in flex items-center gap-2 rounded-lg px-4 py-3"
                style={{
                  background: 'rgba(255,59,59,0.08)',
                  border: '1px solid rgba(255,59,59,0.25)',
                  color: '#ff6b6b',
                  fontSize: '12px',
                  fontFamily: 'DM Mono, monospace'
                }}
              >
                <span style={{ fontSize: '16px' }}>⚠</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="sdp-btn-primary flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <span
                    className="w-4 h-4 rounded-full border-2 animate-spin"
                    style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff' }}
                  />
                  Autenticando...
                </>
              ) : (
                <>
                  Autenticar acceso clínico
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div
            className="mt-8 pt-6"
            style={{ borderTop: '1px solid var(--border-dim)' }}
          >
            <p className="font-mono text-center" style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.1em' }}>
              ACCESO RESTRINGIDO · SOLO PERSONAL AUTORIZADO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
