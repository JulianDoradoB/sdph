import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-deep)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <span
            style={{
              display: 'inline-block',
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '2px solid rgba(0,200,224,0.15)',
              borderTopColor: 'var(--accent-cyan)',
              animation: 'spin 0.7s linear infinite',
            }}
          />
          <span
            className="font-mono"
            style={{ color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.12em' }}
          >
            VERIFICANDO SESIÓN...
          </span>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
