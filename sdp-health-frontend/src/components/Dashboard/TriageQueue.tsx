import React from 'react';
import { Triage, TriageStatus, ManchesterLevel } from '../../types';
import { Badge } from '../UI/Badge';
import { Clock, Thermometer, Heart } from 'lucide-react';

interface TriageQueueProps {
  items: Triage[];
  onSelectPatient: (t: Triage) => void;
  selected?: Triage | null;
}

const statusConfig: Record<TriageStatus, { label: string; color: string; bg: string }> = {
  [TriageStatus.ESPERA_ATENCION]: { label: 'EN ESPERA',   color: '#f5c518', bg: 'rgba(245,197,24,0.1)'  },
  [TriageStatus.EN_CONSULTA]:     { label: 'CONSULTA',    color: '#1a78ff', bg: 'rgba(26,120,255,0.1)'  },
  [TriageStatus.ALTA]:            { label: 'ALTA',         color: '#00c97a', bg: 'rgba(0,201,122,0.1)'   },
  [TriageStatus.DERIVADO]:        { label: 'DERIVADO',    color: '#3b9eff', bg: 'rgba(59,158,255,0.1)'  },
};

const priorityOrder: Record<ManchesterLevel, number> = {
  [ManchesterLevel.RED]:    0,
  [ManchesterLevel.ORANGE]: 1,
  [ManchesterLevel.YELLOW]: 2,
  [ManchesterLevel.GREEN]:  3,
  [ManchesterLevel.BLUE]:   4,
};

function formatTime(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
}

export const TriageQueue: React.FC<TriageQueueProps> = ({ items, onSelectPatient, selected }) => {
  const sorted = [...items].sort((a, b) =>
    (priorityOrder[a.manchesterLevel] ?? 5) - (priorityOrder[b.manchesterLevel] ?? 5)
  );

  return (
    <div className="sdp-card" style={{ overflow: 'hidden' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid var(--border-dim)' }}
      >
        <div className="flex items-center gap-3">
          <h2
            className="font-display text-sm font-700"
            style={{ color: 'var(--text-primary)', letterSpacing: '0.02em' }}
          >
            Cola de Triage
          </h2>
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: 'rgba(0,200,224,0.1)',
              border: '1px solid rgba(0,200,224,0.2)',
              color: 'var(--accent-cyan)'
            }}
          >
            {items.length} pacientes
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot status-dot-active" />
          <span className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.1em' }}>
            TIEMPO REAL
          </span>
        </div>
      </div>

      {/* Tabla */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16" style={{ color: 'var(--text-dim)' }}>
          <Heart size={32} strokeWidth={1} className="mb-3" style={{ opacity: 0.3 }} />
          <p className="font-mono text-xs" style={{ letterSpacing: '0.1em' }}>SIN PACIENTES EN COLA</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="sdp-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Paciente</th>
                <th>Prioridad</th>
                <th>Score</th>
                <th>SpO₂</th>
                <th>FC</th>
                <th>Temp.</th>
                <th>Estado</th>
                <th>Hora</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((item, idx) => {
                const statusCfg = statusConfig[item.status] || statusConfig[TriageStatus.ESPERA_ATENCION];
                const isSelected = selected?.id === item.id;
                const isCritical =
                  item.manchesterLevel === ManchesterLevel.RED ||
                  item.manchesterLevel === ManchesterLevel.ORANGE;

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectPatient(item)}
                    className={isSelected ? 'selected' : ''}
                    style={isSelected ? { outline: '1px solid rgba(0,200,224,0.2)' } : {}}
                  >
                    {/* Número */}
                    <td>
                      <span
                        className="font-mono"
                        style={{ color: 'var(--text-dim)', fontSize: '11px' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </td>

                    {/* Nombre */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isCritical && (
                          <span
                            className="status-dot"
                            style={{
                              background: item.manchesterLevel === ManchesterLevel.RED
                                ? 'var(--red-critical)' : 'var(--orange-high)',
                              boxShadow: `0 0 6px ${item.manchesterLevel === ManchesterLevel.RED
                                ? 'rgba(255,59,59,0.6)' : 'rgba(255,122,26,0.6)'}`,
                              animation: 'pulse-glow 1.5s infinite',
                              flexShrink: 0
                            }}
                          />
                        )}
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                            {item.patient?.firstName} {item.patient?.lastName}
                          </div>
                          <div className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '10px' }}>
                            {item.patient?.dni}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Badge Manchester */}
                    <td>
                      <Badge level={item.manchesterLevel} />
                    </td>

                    {/* Score */}
                    <td>
                      <span
                        className="font-mono font-500"
                        style={{ color: 'var(--accent-cyan)', fontSize: '13px' }}
                      >
                        {item.priorityScore}
                      </span>
                    </td>

                    {/* SpO2 */}
                    <td>
                      <span
                        className="font-mono"
                        style={{
                          color: item.oxygenSaturation < 92 ? 'var(--red-critical)' :
                                 item.oxygenSaturation < 95 ? 'var(--orange-high)'  : 'var(--text-primary)',
                          fontWeight: item.oxygenSaturation < 92 ? 700 : 400,
                          fontSize: '12px'
                        }}
                      >
                        {item.oxygenSaturation}%
                      </span>
                    </td>

                    {/* FC */}
                    <td>
                      <span
                        className="font-mono"
                        style={{
                          color: item.heartRate > 100 || item.heartRate < 60
                            ? 'var(--orange-high)' : 'var(--text-primary)',
                          fontSize: '12px'
                        }}
                      >
                        {item.heartRate}
                      </span>
                    </td>

                    {/* Temp */}
                    <td>
                      <span
                        className="font-mono"
                        style={{
                          color: item.temperature > 38.5 ? 'var(--red-critical)' :
                                 item.temperature > 37.5 ? 'var(--orange-high)'  : 'var(--text-primary)',
                          fontSize: '12px'
                        }}
                      >
                        {item.temperature}°
                      </span>
                    </td>

                    {/* Estado */}
                    <td>
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: statusCfg.bg,
                          color: statusCfg.color,
                          fontSize: '10px',
                          letterSpacing: '0.08em'
                        }}
                      >
                        {statusCfg.label}
                      </span>
                    </td>

                    {/* Hora */}
                    <td>
                      <div className="flex items-center gap-1">
                        <Clock size={10} style={{ color: 'var(--text-dim)', flexShrink: 0 }} />
                        <span
                          className="font-mono"
                          style={{ color: 'var(--text-dim)', fontSize: '11px' }}
                        >
                          {formatTime(item.createdAt)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
