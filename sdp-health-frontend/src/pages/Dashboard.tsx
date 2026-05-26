import React, { useEffect, useState } from 'react';
import { Triage, TriageStatus, ManchesterLevel } from '../types';
import { triageService } from '../services/triage.service';
import { KpiGrid } from '../components/Dashboard/KpiGrid';
import { TriageQueue } from '../components/Dashboard/TriageQueue';
import { Badge } from '../components/UI/Badge';
import { useAuth } from '../context/AuthContext';
import { X, Stethoscope, Pill, ArrowRight, FileText } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [queue, setQueue]           = useState<Triage[]>([]);
  const [selected, setSelected]     = useState<Triage | null>(null);
  const [medication, setMedication] = useState('');
  const [dosage, setDosage]         = useState('');
  const [frequency, setFrequency]   = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();

  const fetchQueue = async () => {
    try {
      const res = await triageService.getQueue();
      setQueue(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchQueue();
    const timer = setInterval(fetchQueue, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleConsultation = async (status: TriageStatus) => {
    if (!selected) return;
    setActionLoading(true);
    try {
      await triageService.updateStatus(selected.id, status);
      setSelected(null);
      fetchQueue();
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  const handlePrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setActionLoading(true);
    try {
      await triageService.createPrescription({
        triageId: selected.id, medicationName: medication, dosage, frequency
      });
      await triageService.updateStatus(selected.id, TriageStatus.ALTA);
      setMedication(''); setDosage(''); setFrequency('');
      setSelected(null);
      fetchQueue();
    } catch (err) { console.error(err); }
    finally { setActionLoading(false); }
  };

  const criticalCount = queue.filter(
    q => q.manchesterLevel === ManchesterLevel.RED || q.manchesterLevel === ManchesterLevel.ORANGE
  ).length;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="sdp-section-header">
        <div>
          <div
            className="font-mono mb-1"
            style={{ color: 'var(--accent-cyan)', fontSize: '10px', letterSpacing: '0.15em' }}
          >
            // PANEL PRINCIPAL
          </div>
          <h1 className="sdp-section-title" style={{ fontSize: '20px' }}>
            Monitor Clínico de Urgencias
          </h1>
        </div>
      </div>

      {/* KPIs */}
      <KpiGrid totalQueue={queue.length} criticals={criticalCount} />

      {/* Layout: tabla + panel lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <TriageQueue items={queue} onSelectPatient={setSelected} selected={selected} />
        </div>

        <div>
          {selected ? (
            <div
              className="sdp-card animate-slide-right"
              style={{
                borderTop: '2px solid var(--accent-cyan)',
                position: 'relative'
              }}
            >
              {/* Cerrar */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4"
                style={{ color: 'var(--text-dim)', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                <X size={15} />
              </button>

              {/* Título */}
              <div className="mb-4 pr-6">
                <div
                  className="font-mono mb-1"
                  style={{ color: 'var(--accent-cyan)', fontSize: '10px', letterSpacing: '0.15em' }}
                >
                  // EXPEDIENTE ACTIVO
                </div>
                <h2
                  className="font-display text-sm font-700"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {selected.patient?.firstName} {selected.patient?.lastName}
                </h2>
              </div>

              {/* Datos del paciente */}
              <div
                className="rounded-lg p-4 mb-4 space-y-3"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-dim)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="sdp-label" style={{ marginBottom: 0 }}>Prioridad</span>
                  <div className="flex items-center gap-2">
                    <Badge level={selected.manchesterLevel} />
                    <span
                      className="font-mono text-xs"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      {selected.priorityScore} pts
                    </span>
                  </div>
                </div>

                <div className="glow-line-h" />

                {/* Signos vitales en grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'SpO₂', value: `${selected.oxygenSaturation}%`, warn: selected.oxygenSaturation < 92 },
                    { label: 'PA', value: `${selected.systolicBp}/${selected.diastolicBp}`, warn: false },
                    { label: 'FC', value: `${selected.heartRate} lpm`, warn: selected.heartRate > 100 || selected.heartRate < 60 },
                    { label: 'Temp.', value: `${selected.temperature}°C`, warn: selected.temperature > 38.5 },
                  ].map(({ label, value, warn }) => (
                    <div
                      key={label}
                      className="rounded-lg p-3"
                      style={{ background: 'var(--bg-elevated)', border: `1px solid ${warn ? 'rgba(255,59,59,0.25)' : 'var(--border-dim)'}` }}
                    >
                      <div className="sdp-label" style={{ marginBottom: '4px', fontSize: '9px' }}>{label}</div>
                      <div
                        className="font-mono font-500"
                        style={{
                          color: warn ? 'var(--red-critical)' : 'var(--text-primary)',
                          fontSize: '14px'
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dolor */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="sdp-label" style={{ marginBottom: 0, fontSize: '9px' }}>DOLOR</span>
                    <span
                      className="font-mono text-xs"
                      style={{
                        color: selected.painScale >= 7 ? 'var(--red-critical)' :
                               selected.painScale >= 4 ? 'var(--orange-high)' : 'var(--text-muted)'
                      }}
                    >
                      {selected.painScale}/10
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${selected.painScale * 10}%`,
                        background: selected.painScale >= 7
                          ? 'var(--red-critical)'
                          : selected.painScale >= 4
                          ? 'var(--orange-high)'
                          : 'var(--accent-teal)',
                      }}
                    />
                  </div>
                </div>

                {/* Síntomas */}
                <div>
                  <span className="sdp-label" style={{ fontSize: '9px' }}>SINTOMATOLOGÍA</span>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.5' }}>
                    {selected.symptomsDescription}
                  </p>
                </div>
              </div>

              {/* Acciones según rol */}
              {user?.role === 'MEDICO' ? (
                <form onSubmit={handlePrescription} className="space-y-3">
                  <div
                    className="flex items-center gap-2 mb-3"
                    style={{ borderTop: '1px solid var(--border-dim)', paddingTop: '12px' }}
                  >
                    <Pill size={13} style={{ color: 'var(--accent-cyan)' }} />
                    <span
                      className="font-mono"
                      style={{ color: 'var(--accent-cyan)', fontSize: '10px', letterSpacing: '0.12em' }}
                    >
                      RECETA ELECTRÓNICA
                    </span>
                  </div>
                  <div>
                    <label className="sdp-label">Medicamento</label>
                    <input
                      type="text" required value={medication}
                      onChange={e => setMedication(e.target.value)}
                      className="sdp-input" placeholder="Ej: Acetaminofén 500mg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="sdp-label">Dosis</label>
                      <input
                        type="text" required value={dosage}
                        onChange={e => setDosage(e.target.value)}
                        className="sdp-input" placeholder="1 Tableta"
                      />
                    </div>
                    <div>
                      <label className="sdp-label">Frecuencia</label>
                      <input
                        type="text" required value={frequency}
                        onChange={e => setFrequency(e.target.value)}
                        className="sdp-input" placeholder="Cada 8h"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="sdp-btn-teal flex items-center justify-center gap-2"
                  >
                    {actionLoading ? (
                      <span className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff' }} />
                    ) : (
                      <>
                        <FileText size={14} />
                        Finalizar & Recetar
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-2" style={{ borderTop: '1px solid var(--border-dim)', paddingTop: '12px' }}>
                  <button
                    onClick={() => handleConsultation(TriageStatus.EN_CONSULTA)}
                    disabled={actionLoading}
                    className="sdp-btn-primary flex items-center justify-center gap-2"
                  >
                    <Stethoscope size={14} />
                    Llamar a Box de Consulta
                  </button>
                  <button
                    onClick={() => handleConsultation(TriageStatus.DERIVADO)}
                    disabled={actionLoading}
                    className="sdp-btn-ghost flex items-center justify-center gap-2"
                  >
                    <ArrowRight size={14} />
                    Derivar a Hospitalización
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div
              className="sdp-card flex flex-col items-center justify-center py-14 text-center"
              style={{ border: '1px dashed var(--border-mid)' }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'rgba(0,200,224,0.06)', border: '1px solid var(--border-mid)' }}
              >
                <Stethoscope size={20} style={{ color: 'var(--text-dim)' }} />
              </div>
              <p
                className="font-mono"
                style={{ color: 'var(--text-dim)', fontSize: '11px', letterSpacing: '0.1em' }}
              >
                SELECCIONA UN PACIENTE
              </p>
              <p style={{ color: 'var(--text-dim)', fontSize: '12px', marginTop: '6px' }}>
                para abrir el expediente en tiempo real
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
