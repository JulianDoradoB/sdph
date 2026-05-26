import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity, LayoutDashboard, UserPlus, Pill, LogOut, Wifi, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roleLabels: Record<string, string> = {
  ADMIN:      'Administrador',
  MEDICO:     'Médico',
  ENFERMERO:  'Enfermero/a',
  RECEPCION:  'Recepción',
};

const navItems = [
  { to: '/dashboard',            icon: LayoutDashboard, label: 'Monitor Clínico' },
  { to: '/patient-registration', icon: UserPlus,         label: 'Admisión & Triage' },
  { to: '/pharmacy',             icon: Pill,             label: 'Farmacia' },
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase()
    : 'US';

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-deep)' }}>
      {/* Sidebar */}
      <aside className="sdp-sidebar">
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: '1px solid var(--border-dim)' }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 animate-heartbeat"
            style={{
              background: 'linear-gradient(135deg, #1a78ff, #0044cc)',
              boxShadow: '0 0 16px rgba(26,120,255,0.3)'
            }}
          >
            <Activity size={15} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <div
              className="font-display text-sm font-700 leading-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '0.01em' }}
            >
              SDP<span style={{ color: 'var(--accent-cyan)' }}>·</span>HEALTH
            </div>
            <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '9px', letterSpacing: '0.1em' }}>
              v2.4 · ACTIVO
            </div>
          </div>
        </div>

        {/* Status */}
        <div
          className="mx-3 my-3 px-3 py-2 rounded-lg flex items-center gap-2"
          style={{ background: 'rgba(0,229,176,0.06)', border: '1px solid rgba(0,229,176,0.12)' }}
        >
          <span className="status-dot status-dot-active" />
          <span className="font-mono" style={{ color: 'var(--accent-teal)', fontSize: '10px', letterSpacing: '0.1em' }}>
            SISTEMA OPERATIVO
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2">
          <div
            className="px-4 mb-3 font-mono"
            style={{ color: 'var(--text-dim)', fontSize: '9px', letterSpacing: '0.14em' }}
          >
            NAVEGACIÓN
          </div>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `sdp-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={15} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User panel */}
        <div
          className="p-3"
          style={{ borderTop: '1px solid var(--border-dim)' }}
        >
          <div
            className="flex items-center gap-3 p-3 rounded-lg mb-2"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-dim)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-display text-xs font-700"
              style={{ background: 'linear-gradient(135deg, #243547, #1a2d40)', color: 'var(--accent-cyan)' }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-xs font-500 truncate"
                style={{ color: 'var(--text-primary)' }}
              >
                {user?.name || 'Usuario'}
              </div>
              <div
                className="font-mono truncate"
                style={{ color: 'var(--text-dim)', fontSize: '9px', letterSpacing: '0.08em' }}
              >
                {roleLabels[user?.role || ''] || user?.role}
              </div>
            </div>
            <Shield size={12} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
          </div>

          <button
            onClick={handleLogout}
            className="sdp-nav-item w-full justify-start"
            style={{ color: 'var(--text-muted)', marginLeft: 0, marginRight: 0 }}
          >
            <LogOut size={14} />
            <span className="text-xs">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-8 py-4"
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-dim)',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div className="flex items-center gap-2">
            <Wifi size={12} style={{ color: 'var(--accent-teal)' }} />
            <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.1em' }}>
              CONEXIÓN SEGURA · ACTUALIZACIÓN CADA 15s
            </span>
          </div>
          <div
            className="font-mono text-xs"
            style={{ color: 'var(--text-dim)', letterSpacing: '0.08em' }}
          >
            {new Date().toLocaleString('es-CO', {
              day: '2-digit', month: 'short', year: 'numeric',
              hour: '2-digit', minute: '2-digit'
            }).toUpperCase()}
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
