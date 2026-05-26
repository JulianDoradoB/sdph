import React, { useState, useEffect } from 'react';
import { Activity, Mail, Lock, ChevronRight, Wifi, Shield } from 'lucide-react';
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .sdp-login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #050e1a;
          overflow: hidden;
          position: relative;
        }

        .sdp-bg-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,180,200,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,200,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .sdp-glow-l {
          position: fixed;
          left: -200px;
          top: 15%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(0,120,180,0.10) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        .sdp-glow-r {
          position: fixed;
          right: -80px;
          bottom: 5%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(0,200,160,0.07) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
        }

        .sdp-ecg-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #00c9a7 20%, #0099cc 50%, #00c9a7 80%, transparent 100%);
          opacity: 0.35;
          pointer-events: none;
        }

        /* ── LEFT PANEL ── */
        .sdp-left {
          flex: 1;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          padding: 56px 64px;
          border-right: 1px solid rgba(0,180,200,0.08);
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .sdp-left { display: flex; }
        }

        .sdp-left-glow-circle-1 {
          position: absolute;
          bottom: -120px;
          left: -120px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,200,224,0.055) 0%, transparent 70%);
          pointer-events: none;
        }

        .sdp-left-glow-circle-2 {
          position: absolute;
          top: 25%;
          right: 24px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(26,120,255,0.045) 0%, transparent 70%);
          pointer-events: none;
        }

        .sdp-left-vline {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent 0%, rgba(0,200,224,0.22) 40%, transparent 100%);
        }

        .sdp-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .sdp-brand-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: linear-gradient(135deg, #1a78ff, #0044cc);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 22px rgba(26,120,255,0.30);
          animation: sdp-heartbeat 2.4s ease-in-out infinite;
        }

        @keyframes sdp-heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.07); }
          28% { transform: scale(1); }
          42% { transform: scale(1.04); }
          56% { transform: scale(1); }
        }

        .sdp-brand-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
        }

        .sdp-brand-name span {
          color: #00c9a7;
        }

        .sdp-center {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sdp-hero-label {
          font-family: 'DM Mono', monospace;
          font-size: 10.5px;
          color: #00c9a7;
          letter-spacing: 0.20em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .sdp-ecg-svg {
          width: 280px;
          height: 52px;
          opacity: 0.35;
          margin-bottom: 28px;
        }

        .sdp-ecg-line {
          fill: none;
          stroke: #00c9a7;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: sdp-ecg-draw 3s ease forwards 0.4s, sdp-ecg-pulse 3s ease-in-out infinite 3.5s;
        }

        @keyframes sdp-ecg-draw {
          to { stroke-dashoffset: 0; }
        }

        @keyframes sdp-ecg-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.6; }
        }

        .sdp-hero-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 50px;
          font-weight: 300;
          line-height: 1.12;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 0;
        }

        .sdp-hero-title .accent {
          font-weight: 700;
          background: linear-gradient(90deg, #00c9a7, #0099cc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .sdp-hero-title .dim {
          font-size: 36px;
          color: rgba(255,255,255,0.22);
          font-weight: 300;
          -webkit-text-fill-color: rgba(255,255,255,0.22);
        }

        .sdp-hero-desc {
          font-size: 14.5px;
          color: rgba(255,255,255,0.38);
          line-height: 1.72;
          max-width: 340px;
          margin-top: 20px;
          margin-bottom: 48px;
        }

        .sdp-stats {
          display: flex;
          gap: 0;
        }

        .sdp-stat {
          padding-right: 32px;
          margin-right: 32px;
          border-right: 1px solid rgba(255,255,255,0.07);
        }

        .sdp-stat:last-child {
          border-right: none;
          padding-right: 0;
          margin-right: 0;
        }

        .sdp-stat-val {
          font-family: 'DM Mono', monospace;
          font-size: 20px;
          font-weight: 500;
          color: #00c9a7;
          margin-bottom: 4px;
        }

        .sdp-stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .sdp-footer-text {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.10em;
          position: relative;
          z-index: 1;
        }

        /* ── RIGHT PANEL ── */
        .sdp-right {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
          position: relative;
          z-index: 1;
        }

        @media (min-width: 1024px) {
          .sdp-right {
            width: 460px;
            flex-shrink: 0;
            padding: 48px 56px;
          }
        }

        .sdp-form-card {
          width: 100%;
          max-width: 360px;
        }

        /* Mobile brand */
        .sdp-mobile-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
        }

        @media (min-width: 1024px) {
          .sdp-mobile-brand { display: none; }
        }

        .sdp-mobile-brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #1a78ff, #0044cc);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sdp-access-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(0,201,167,0.07);
          border: 1px solid rgba(0,201,167,0.18);
          border-radius: 100px;
          padding: 5px 13px 5px 9px;
          margin-bottom: 18px;
        }

        .sdp-access-dot {
          width: 6px;
          height: 6px;
          background: #00c9a7;
          border-radius: 50%;
          animation: sdp-dot-pulse 2s ease-in-out infinite;
        }

        @keyframes sdp-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.85); }
        }

        .sdp-access-label {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: #00c9a7;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .sdp-form-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .sdp-form-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          line-height: 1.65;
          margin-bottom: 32px;
        }

        .sdp-field {
          margin-bottom: 18px;
        }

        .sdp-field-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: rgba(255,255,255,0.32);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .sdp-input-wrap {
          position: relative;
        }

        .sdp-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.20);
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s;
        }

        .sdp-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 13px 14px 13px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }

        .sdp-input::placeholder {
          color: rgba(255,255,255,0.16);
        }

        .sdp-input:focus {
          border-color: rgba(0,201,167,0.38);
          background: rgba(0,201,167,0.04);
        }

        .sdp-input:focus + .sdp-input-icon,
        .sdp-input-wrap:focus-within .sdp-input-icon {
          color: rgba(0,201,167,0.55);
        }

        .sdp-forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
          margin-bottom: 26px;
        }

        .sdp-forgot-link {
          font-size: 12px;
          color: rgba(0,201,167,0.5);
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          transition: color 0.2s;
        }

        .sdp-forgot-link:hover {
          color: #00c9a7;
        }

        .sdp-error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,59,59,0.07);
          border: 1px solid rgba(255,59,59,0.22);
          border-radius: 9px;
          padding: 11px 14px;
          margin-bottom: 16px;
          color: #ff7070;
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.02em;
        }

        .sdp-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #0099cc 0%, #00c9a7 100%);
          border: none;
          border-radius: 10px;
          padding: 14px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #04120e;
          cursor: pointer;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: opacity 0.2s, transform 0.12s;
          margin-bottom: 24px;
        }

        .sdp-submit-btn:hover:not(:disabled) {
          opacity: 0.88;
        }

        .sdp-submit-btn:active:not(:disabled) {
          transform: scale(0.985);
        }

        .sdp-submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .sdp-spinner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 2px solid rgba(4,18,14,0.25);
          border-top-color: #04120e;
          animation: sdp-spin 0.7s linear infinite;
        }

        @keyframes sdp-spin {
          to { transform: rotate(360deg); }
        }

        .sdp-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }

        .sdp-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        .sdp-divider-text {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .sdp-form-footer {
          text-align: center;
        }

        .sdp-form-footer p {
          font-family: 'DM Mono', monospace;
          font-size: 9.5px;
          color: rgba(255,255,255,0.16);
          letter-spacing: 0.10em;
          text-transform: uppercase;
          line-height: 1.9;
        }

        /* Fade-up animation */
        .sdp-fade-up {
          opacity: 0;
          transform: translateY(16px);
          animation: sdp-fade-up 0.55s ease forwards;
        }

        .sdp-delay-1 { animation-delay: 0.08s; }
        .sdp-delay-2 { animation-delay: 0.18s; }
        .sdp-delay-3 { animation-delay: 0.28s; }

        @keyframes sdp-fade-up {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="sdp-login-root">
        <div className="sdp-bg-grid" />
        <div className="sdp-glow-l" />
        <div className="sdp-glow-r" />
        <div className="sdp-ecg-bar" />

        {/* ── LEFT PANEL ── */}
        <div className="sdp-left">
          <div className="sdp-left-glow-circle-1" />
          <div className="sdp-left-glow-circle-2" />
          <div className="sdp-left-vline" />

          {/* Brand */}
          <div className={`sdp-brand ${mounted ? 'sdp-fade-up' : ''}`}>
            <div className="sdp-brand-icon">
              <Activity size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <span className="sdp-brand-name">
              SDP<span>·</span>HEALTH
            </span>
          </div>

          {/* Hero */}
          <div className={`sdp-center ${mounted ? 'sdp-fade-up sdp-delay-1' : ''}`}>
            <div className="sdp-hero-label">// plataforma clínica</div>

            <svg className="sdp-ecg-svg" viewBox="0 0 300 60">
              <polyline
                className="sdp-ecg-line"
                points="0,30 40,30 55,30 60,10 65,50 70,30 85,30 95,30 100,5 105,55 110,30 125,30 200,30 300,30"
              />
            </svg>

            <h1 className="sdp-hero-title">
              Control<br />
              <span className="accent">Hospitalario</span><br />
              <span className="dim">& Triage</span>
            </h1>

            <p className="sdp-hero-desc">
              Plataforma de gestión clínica con clasificación Manchester
              en tiempo real para equipos de urgencias.
            </p>

            <div className="sdp-stats">
              {[
                { value: '< 3s', label: 'Clasificación' },
                { value: '5 NVL', label: 'Manchester' },
                { value: 'HL7', label: 'Estándar' },
              ].map((stat) => (
                <div key={stat.label} className="sdp-stat">
                  <div className="sdp-stat-val">{stat.value}</div>
                  <div className="sdp-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={`sdp-footer-text ${mounted ? 'sdp-fade-up sdp-delay-2' : ''}`}>
            <Wifi size={12} />
            <span>Sistema encriptado · Conforme estándares seguridad médica</span>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="sdp-right">
          <div className={`sdp-form-card ${mounted ? 'sdp-fade-up sdp-delay-2' : ''}`}>

            {/* Mobile brand */}
            <div className="sdp-mobile-brand">
              <div className="sdp-mobile-brand-icon">
                <Activity size={16} color="#fff" strokeWidth={2.5} />
              </div>
              <span className="sdp-brand-name">SDP<span style={{ color: '#00c9a7' }}>·</span>HEALTH</span>
            </div>

            {/* Access chip */}
            <div className="sdp-access-chip">
              <div className="sdp-access-dot" />
              <span className="sdp-access-label">Acceso autorizado</span>
            </div>

            <h2 className="sdp-form-title">Iniciar sesión</h2>
            <p className="sdp-form-desc">
              Ingresa con tus credenciales clínicas asignadas por el sistema.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="sdp-field">
                <label className="sdp-field-label">Correo institucional</label>
                <div className="sdp-input-wrap">
                  <span className="sdp-input-icon">
                    <Mail size={15} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="sdp-input"
                    placeholder="medico@hospital.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="sdp-field">
                <label className="sdp-field-label">Contraseña de seguridad</label>
                <div className="sdp-input-wrap">
                  <span className="sdp-input-icon">
                    <Lock size={15} />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="sdp-input"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Forgot */}
              <div className="sdp-forgot-row">
                <button type="button" className="sdp-forgot-link">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="sdp-error-box">
                  <span>⚠</span>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="sdp-submit-btn"
              >
                {loading ? (
                  <>
                    <span className="sdp-spinner" />
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

            {/* Bottom */}
            <div className="sdp-divider">
              <div className="sdp-divider-line" />
              <span className="sdp-divider-text">sistema encriptado</span>
              <div className="sdp-divider-line" />
            </div>

            <div className="sdp-form-footer">
              <p>Acceso restringido · Solo personal autorizado</p>
              <p>Conforme estándares seguridad médica</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
