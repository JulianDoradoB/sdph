import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';

// 🚀 Lazy Loading para optimizar la carga
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const PatientRegistration = lazy(() => import('./pages/PatientRegistration').then(m => ({ default: m.PatientRegistration })));
const Pharmacy = lazy(() => import('./pages/Pharmacy').then(m => ({ default: m.Pharmacy })));

const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-[#080d14] flex items-center justify-center text-xs font-mono tracking-widest text-gray-400">
    CARGANDO MÓDULO HOSPITALARIO...
  </div>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* ================= RUTAS PÚBLICAS ================= */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* ================= RUTAS PRIVADAS ================= */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/patient-registration" element={<Layout><PatientRegistration /></Layout>} />
              <Route path="/pharmacy" element={<Layout><Pharmacy /></Layout>} />
            </Route>

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/register" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;