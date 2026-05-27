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
    <div className="animate-fade-in p-6 min-h-screen bg-[#020813] text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-800/60">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00f0ff] mb-1">
            // MONITORIZACIÓN GLOBAL DE TRIAJE
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Monitor Clínico de Urgencias
          </h1>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/20 bg-teal-500/5 font-mono text-[11px] text-[#00c8e0]">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          SISTEMA EN TIEMPO REAL
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="mb-8">
        <KpiGrid totalQueue={queue.length} criticals={criticalCount} />
      </div>

      {/* Layout de Dos Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Tabla / Cola Principal */}
        <div className="lg:col-span-2 bg-[#060e1c] border border-slate-800 rounded-xl overflow-hidden shadow-2xl shadow-black/40">
          <TriageQueue items={queue} onSelectPatient={setSelected} selected={selected} />
        </div>

        {/* Panel Lateral de Detalles */}
        <div className="transition-all duration-300">
          {selected ? (
            <div className="bg-[#060e1c] border border-slate-800 rounded-xl p-5 shadow-2xl relative animate-slide-right overflow-hidden">
              {/* Línea decorativa superior Cyan tecnológica */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00c8e0] to-teal-500" />

              {/* Botón Cerrar */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800/50 rounded-lg"
              >
                <X size={16} />
              </button>

              {/* Encabezado del Expediente */}
              <div className="mb-5">
                <div className="font-mono text-[9px] tracking-[0.15em] text-[#00c8e0] mb-1">
                  // EXPEDIENTE ACTIVO M-{(selected.id || '').substring(0,6).toUpperCase()}
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  {selected.patient?.firstName} {selected.patient?.lastName}
                </h2>
              </div>

              {/* Tarjeta Interna de Signos Vitales */}
              <div className="bg-[#020813] border border-slate-800/80 rounded-xl p-4 space-y-4 mb-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">Prioridad de Clasificación</span>
                  <div className="flex items-center gap-2">
                    <Badge level={selected.manchesterLevel} />
                    <span className="font-mono text-xs font-bold text-[#00c8e0] bg-[#00c8e0]/5 px-2 py-0.5 rounded border border-teal-500/20">
                      {selected.priorityScore} PTS
                    </span>
                  </div>
                </div>

                {/* Grid de Constantes Vitales */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { label: 'SpO₂ (Sat. Oxígeno)', value: `${selected.oxygenSaturation}%`, warn: selected.oxygenSaturation < 92 },
                    { label: 'PA (Presión Arterial)', value: `${selected.systolicBp}/${selected.diastolicBp}`, warn: false },
                    { label: 'FC (Frec. Cardíaca)', value: `${selected.heartRate} lpm`, warn: selected.heartRate > 100 || selected.heartRate < 60 },
                    { label: 'T° (Temperatura)', value: `${selected.temperature}°C`, warn: selected.temperature > 38.5 },
                  ].map(({ label, value, warn }) => (
                    <div
                      key={label}
                      className={`rounded-lg p-3 border transition-colors ${
                        warn 
                          ? 'bg-red-500/5 border-red-500/20' 
                          : 'bg-[#060e1c] border-slate-800/80'
                      }`}
                    >
                      <div className="font-mono text-[9px] text-slate-400 uppercase mb-1 tracking-wide">{label}</div>
                      <div className={`font-mono font-bold text-[15px] ${warn ? 'text-red-400' : 'text-slate-100'}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pain Scale (Escala de Dolor) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wide">Escala Analógica del Dolor</span>
                    <span className={`font-mono text-xs font-bold ${
                      selected.painScale >= 7 ? 'text-red-400' : selected.painScale >= 4 ? 'text-amber-400' : 'text-teal-400'
                    }`}>
                      {selected.painScale} / 10
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#060e1c] overflow-hidden p-[1px] border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${selected.painScale * 10}%`,
                        backgroundColor: selected.painScale >= 7 ? '#f87171' : selected.painScale >= 4 ? '#fbbf24' : '#2dd4bf'
                      }}
                    />
                  </div>
                </div>

                {/* Síntomas */}
                <div className="pt-2 border-t border-slate-800/60">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wide block mb-1">Motivo de Consulta / Síntomas</span>
                  <p className="text-xs text-slate-300 leading-relaxed bg-[#060e1c] p-2.5 rounded-lg border border-slate-800/50">
                    {selected.symptomsDescription || "No se registraron detalles adicionales."}
                  </p>
                </div>
              </div>

              {/* Bloque de Acciones Dinámicas por Rol */}
              {user?.role === 'MEDICO' ? (
                <form onSubmit={handlePrescription} className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 mb-3 border-t border-slate-800/80 pt-4">
                    <Pill size={14} className="text-[#00c8e0]" />
                    <span className="font-mono text-[10px] font-bold tracking-wider text-[#00c8e0] uppercase">
                      Módulo de Receta Electrónica
                    </span>
                  </div>
                  
                  <div>
                    <label className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1">Medicamento</label>
                    <input
                      type="text" required value={medication}
                      onChange={e => setMedication(e.target.value)}
                      className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00c8e0]/50 transition-colors font-mono" 
                      placeholder="Ej: Paracetamol 1g IV"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1">Dosis</label>
                      <input
                        type="text" required value={dosage}
                        onChange={e => setDosage(e.target.value)}
                        className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00c8e0]/50 transition-colors font-mono" 
                        placeholder="Cada 8 horas"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block mb-1">Frecuencia / Duración</label>
                      <input
                        type="text" required value={frequency}
                        onChange={e => setFrequency(e.target.value)}
                        className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-[#00c8e0]/50 transition-colors font-mono" 
                        placeholder="Por 3 días"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="w-full mt-4 bg-gradient-to-r from-[#00b4cc] to-[#00d4af] text-slate-950 font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-teal-500/10"
                  >
                    {actionLoading ? (
                      <span className="w-4 h-4 rounded-full border-2 border-slate-950/20 border-t-slate-950 animate-spin" />
                    ) : (
                      <>
                        <FileText size={15} />
                        Finalizar y Alta Médica
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => handleConsultation(TriageStatus.EN_CONSULTA)}
                    disabled={actionLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-lg shadow-indigo-500/10"
                  >
                    <Stethoscope size={15} />
                    Llamar a Box de Consulta
                  </button>
                  <button
                    onClick={() => handleConsultation(TriageStatus.DERIVADO)}
                    disabled={actionLoading}
                    className="w-full bg-transparent hover:bg-slate-800/40 border border-slate-700 hover:border-slate-500 text-slate-300 font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <ArrowRight size={15} />
                    Derivar a Hospitalización
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Estado Vacío - Ningún Paciente Seleccionado */
            <div className="border border-dashed border-slate-800 bg-[#060e1c]/50 rounded-xl flex flex-col items-center justify-center py-16 px-4 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-teal-500/5 border border-slate-800 text-slate-500">
                <Stethoscope size={20} />
              </div>
              <p className="font-mono text-[10px] tracking-[0.15em] text-slate-400 uppercase">
                SISTEMA EN ESPERA
              </p>
              <p className="text-xs text-slate-500 max-w-[200px] mt-1.5 leading-normal">
                Selecciona un paciente de la lista para gestionar su expediente clínico.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};