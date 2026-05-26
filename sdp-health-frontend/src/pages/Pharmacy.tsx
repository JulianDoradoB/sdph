import React from 'react';
import { Pill, FlaskConical, Truck, BarChart3 } from 'lucide-react';

export const Pharmacy: React.FC = () => {
  const modules = [
    {
      icon: Pill,
      title: 'Despacho de Recetas',
      desc: 'Despacho atómico de prescripciones médicas con validación de interacciones farmacológicas bajo estándar HL7.',
      status: 'Sprint 6',
      color: 'var(--accent-cyan)',
      bg: 'rgba(0,200,224,0.08)',
      border: 'rgba(0,200,224,0.15)',
    },
    {
      icon: FlaskConical,
      title: 'Inventario Cruzado',
      desc: 'Control de stock en tiempo real con alertas automáticas de desabastecimiento y caducidad.',
      status: 'Sprint 7',
      color: 'var(--accent-teal)',
      bg: 'rgba(0,229,176,0.08)',
      border: 'rgba(0,229,176,0.15)',
    },
    {
      icon: Truck,
      title: 'Cadena de Suministro',
      desc: 'Integración con proveedores farmacéuticos y sistema de pedidos automatizados.',
      status: 'Sprint 8',
      color: 'var(--accent-blue)',
      bg: 'rgba(26,120,255,0.08)',
      border: 'rgba(26,120,255,0.15)',
    },
    {
      icon: BarChart3,
      title: 'Analítica de Consumo',
      desc: 'Reportes de consumo por servicio, rotación de inventario y proyección de demanda.',
      status: 'Sprint 9',
      color: 'var(--yellow-mid)',
      bg: 'rgba(245,197,24,0.08)',
      border: 'rgba(245,197,24,0.15)',
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="sdp-section-header">
        <div>
          <div className="font-mono mb-1" style={{ color: 'var(--accent-cyan)', fontSize: '10px', letterSpacing: '0.15em' }}>
            // MÓDULO FARMACIA
          </div>
          <h1 className="sdp-section-title" style={{ fontSize: '20px' }}>
            Suministros Médicos & Farmacia
          </h1>
        </div>
      </div>

      {/* Banner principal */}
      <div
        className="sdp-card mb-6 relative overflow-hidden"
        style={{ borderTop: '2px solid var(--accent-cyan)' }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32"
          style={{ background: 'radial-gradient(circle, rgba(0,200,224,0.05) 0%, transparent 70%)' }}
        />
        <div className="flex items-start gap-4 relative z-10">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(0,200,224,0.1)', border: '1px solid rgba(0,200,224,0.2)' }}
          >
            <Pill size={22} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <div>
            <h2
              className="font-display text-lg font-700 mb-1"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
            >
              Control de Inventario Farmacéutico
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', maxWidth: '520px' }}>
              Módulo en desarrollo activo. Permitirá el despacho atómico de recetas médicas, validación de interacciones farmacológicas bajo el estándar HL7 y gestión de cadena de suministro hospitalaria.
            </p>
          </div>
          <div className="ml-auto flex-shrink-0">
            <span
              className="font-mono text-xs px-3 py-1.5 rounded-lg"
              style={{
                background: 'rgba(245,197,24,0.1)',
                border: '1px solid rgba(245,197,24,0.25)',
                color: 'var(--yellow-mid)'
              }}
            >
              EN DESARROLLO
            </span>
          </div>
        </div>
      </div>

      {/* Grid de módulos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.map(({ icon: Icon, title, desc, status, color, bg, border }) => (
          <div
            key={title}
            className="sdp-card sdp-card-glow"
            style={{ opacity: 0.7 }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon size={16} style={{ color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display text-sm font-600" style={{ color: 'var(--text-primary)' }}>
                    {title}
                  </h3>
                  <span
                    className="font-mono"
                    style={{ color: 'var(--text-dim)', fontSize: '9px', letterSpacing: '0.1em' }}
                  >
                    {status.toUpperCase()}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.5' }}>
                  {desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
