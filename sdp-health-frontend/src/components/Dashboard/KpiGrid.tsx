import React from 'react';
import { Users, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface KpiGridProps {
  totalQueue: number;
  criticals: number;
}

export const KpiGrid: React.FC<KpiGridProps> = ({ totalQueue, criticals }) => {
  const waiting   = Math.max(0, totalQueue - criticals);
  const available = Math.max(0, 8 - totalQueue);

  const kpis = [
    {
      label: 'En Cola',
      value: totalQueue,
      icon: Users,
      variant: 'cyan',
      sub: 'pacientes activos',
    },
    {
      label: 'Críticos',
      value: criticals,
      icon: AlertTriangle,
      variant: 'red',
      sub: 'rojo + naranja',
    },
    {
      label: 'En Espera',
      value: waiting,
      icon: Clock,
      variant: 'blue',
      sub: 'pendientes atención',
    },
    {
      label: 'Boxes Disp.',
      value: available,
      icon: CheckCircle,
      variant: 'teal',
      sub: 'consultorios libres',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map(({ label, value, icon: Icon, variant, sub }) => (
        <div key={label} className={`kpi-card kpi-card-${variant}`}>
          <div className="flex items-start justify-between mb-3">
            <span className="sdp-label" style={{ marginBottom: 0 }}>{label}</span>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: variant === 'cyan'  ? 'rgba(0,200,224,0.1)'    :
                            variant === 'red'   ? 'rgba(255,59,59,0.1)'    :
                            variant === 'blue'  ? 'rgba(26,120,255,0.1)'   :
                                                  'rgba(0,229,176,0.1)',
                border: `1px solid ${
                  variant === 'cyan'  ? 'rgba(0,200,224,0.2)'    :
                  variant === 'red'   ? 'rgba(255,59,59,0.2)'    :
                  variant === 'blue'  ? 'rgba(26,120,255,0.2)'   :
                                        'rgba(0,229,176,0.2)'
                }`
              }}
            >
              <Icon
                size={14}
                style={{
                  color: variant === 'cyan'  ? 'var(--accent-cyan)'  :
                         variant === 'red'   ? 'var(--red-critical)' :
                         variant === 'blue'  ? 'var(--accent-blue)'  :
                                               'var(--accent-teal)'
                }}
              />
            </div>
          </div>
          <div
            className="font-display text-3xl font-700 mb-1"
            style={{
              color: variant === 'cyan'  ? 'var(--accent-cyan)'  :
                     variant === 'red'   ? 'var(--red-critical)' :
                     variant === 'blue'  ? 'var(--accent-blue)'  :
                                           'var(--accent-teal)',
              letterSpacing: '-0.02em'
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.08em' }}>
            {sub.toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
};
