import React, { useState } from 'react';
import { patientService } from '../services/patient.service';
import { triageService } from '../services/triage.service';
import Loader from '../components/UI/Loader';
import { UserPlus, Activity, ChevronRight, ChevronLeft } from 'lucide-react';

export const PatientRegistration = () => {
  const [dni, setDni]             = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender]       = useState('M');

  const [systolicBp, setSystolicBp]             = useState<number>(120);
  const [diastolicBp, setDiastolicBp]           = useState<number>(80);
  const [heartRate, setHeartRate]               = useState<number>(80);
  const [respiratoryRate, setRespiratoryRate]   = useState<number>(16);
  const [temperature, setTemperature]           = useState<number>(36.5);
  const [oxygenSaturation, setOxygenSaturation] = useState<number>(98);
  const [painScale, setPainScale]               = useState<number>(0);
  const [symptomsDescription, setSymptomsDescription] = useState('');

  const [loading, setLoading]     = useState(false);
  const [step, setStep]           = useState(1);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [patientFound, setPatientFound] = useState(false);

  const handleFindOrCreatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let pId = '';
      try {
        const res = await patientService.getByDni(dni);
        pId = res.data.id;
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setPatientFound(true);
      } catch {
        const res = await patientService.create({ dni, firstName, lastName, birthDate, gender });
        pId = res.data.id;
        setPatientFound(false);
      }
      setPatientId(pId);
      setStep(2);
    } catch (err) {
      alert('Error al procesar la admisión del paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleTriageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patientId) return;
    setLoading(true);
    try {
      await triageService.create({
        patientId, systolicBp, diastolicBp, heartRate,
        respiratoryRate, temperature, oxygenSaturation, painScale, symptomsDescription
      });
      // Reset completo
      setStep(1); setDni(''); setFirstName(''); setLastName(''); setBirthDate('');
      setSymptomsDescription(''); setSystolicBp(120); setDiastolicBp(80);
      setHeartRate(80); setRespiratoryRate(16); setTemperature(36.5);
      setOxygenSaturation(98); setPainScale(0); setPatientId(null);
    } catch (err) {
      alert('Error guardando el registro de triage clínico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto p-4 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-800/60">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00f0ff] mb-1">
            // ADMISIÓN CLÍNICA Y CONTROL DE FLUJO
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Registro de Pacientes & Triage
          </h1>
        </div>
      </div>

      {/* Progress Steps (Línea de Progreso) */}
      <div className="flex items-center gap-4 mb-8 bg-[#060e1c] p-3 rounded-xl border border-slate-800/80">
        {[
          { n: 1, label: 'Identidad Demográfica' },
          { n: 2, label: 'Constantes Vitales & Anamnesis' },
        ].map(({ n, label }, i) => (
          <React.Fragment key={n}>
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  step >= n
                    ? 'bg-gradient-to-r from-[#00b4cc] to-[#00d4af] text-slate-950 shadow-lg shadow-teal-500/10'
                    : 'bg-[#020813] border border-slate-800 text-slate-500'
                }`}
              >
                0{n}
              </div>
              <span
                className={`text-xs font-mono tracking-wide hidden sm:block ${
                  step >= n ? 'text-slate-200' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
            {i < 1 && (
              <div
                className={`flex-1 h-[1px] mx-2 transition-colors ${
                  step > 1 ? 'bg-teal-500/40' : 'bg-slate-800'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* PASO 1: VALIDACIÓN DE IDENTIDAD */}
      {step === 1 && (
        <div className="bg-[#060e1c] border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden animate-fade-up">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00c8e0] to-[#1a78ff]" />
          
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-800/60">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <UserPlus size={15} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white tracking-wide">
                Validación de Identidad
              </h2>
              <p className="font-mono text-[9px] text-slate-500 tracking-wider uppercase mt-0.5">
                Verificación en base de datos centralizada
              </p>
            </div>
          </div>

          <form onSubmit={handleFindOrCreatePatient} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                DNI / Documento de Identidad
              </label>
              <input
                type="text" required value={dni}
                onChange={e => setDni(e.target.value)}
                className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors font-mono" 
                placeholder="Introduzca el número identificador"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Nombres</label>
                <input
                  type="text" required value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Apellidos</label>
                <input
                  type="text" required value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-700 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Fecha de Nacimiento</label>
                <input
                  type="date" required value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500/50 transition-colors font-mono colors-scheme-dark"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">Género Clínico</label>
                <select 
                  value={gender} 
                  onChange={e => setGender(e.target.value)} 
                  className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50 transition-colors"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro / Intersexual</option>
                </select>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50 shadow-lg shadow-indigo-500/10"
            >
              {loading ? <Loader /> : (
                <>
                  Validar & Continuar admisión
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* PASO 2: CONSTANTES VITALES */}
      {step === 2 && (
        <div className="bg-[#060e1c] border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden animate-fade-up">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 to-[#ff7a1a]" />
          
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 border border-red-500/20 text-red-400">
                <Activity size={15} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">
                  Constantes Vitales & Fisiología
                </h2>
                <p className="font-mono text-[9px] text-[#00f0ff] tracking-wider uppercase mt-0.5">
                  {patientFound ? '✓ EXPEDIENTE EXISTENTE' : '// ASIGNANDO NUEVA FICHA'} · {firstName.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              type="button" onClick={() => setStep(1)}
              className="flex items-center gap-1 font-mono text-[10px] text-slate-500 hover:text-[#00f0ff] transition-colors"
            >
              <ChevronLeft size={14} /> VOLVER
            </button>
          </div>

          <form onSubmit={handleTriageSubmit} className="space-y-5">
            {/* Grid de Constantes Médicas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#020813] p-4 rounded-xl border border-slate-800/80">
              {[
                { label: 'P. Sistólica (mmHg)',   value: systolicBp,      setter: setSystolicBp,      step: '1' },
                { label: 'P. Diastólica (mmHg)',  value: diastolicBp,     setter: setDiastolicBp,     step: '1' },
                { label: 'Frec. Cardíaca (lpm)',  value: heartRate,        setter: setHeartRate,        step: '1' },
                { label: 'Frec. Respiratoria',    value: respiratoryRate,  setter: setRespiratoryRate,  step: '1' },
                { label: 'Saturación O₂ (%)',     value: oxygenSaturation, setter: setOxygenSaturation, step: '1', max: 100 },
                { label: 'Temperatura (°C)',       value: temperature,      setter: setTemperature,      step: '0.1' },
              ].map(({ label, value, setter, step: s, max }) => (
                <div key={label} className="space-y-1">
                  <label className="font-mono text-[9px] text-slate-400 uppercase tracking-wide block">{label}</label>
                  <input
                    type="number"
                    required
                    step={s}
                    max={max}
                    value={value}
                    onChange={e => setter(Number(e.target.value))}
                    className="w-full bg-[#060e1c] border border-slate-800/80 rounded-lg px-3 py-1.5 font-mono text-sm text-slate-100 focus:outline-none focus:border-red-500/40 transition-colors"
                  />
                </div>
              ))}
            </div>

            {/* Selector de Escala de Dolor Avanzado */}
            <div className="bg-[#020813] p-4 rounded-xl border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Escala Analógica del Dolor (EVA)</label>
                <span
                  className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    painScale >= 7 
                      ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                      : painScale >= 4 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                      : 'bg-teal-500/10 border-teal-500/30 text-teal-400'
                  }`}
                >
                  {painScale} / 10
                </span>
              </div>
              <input
                type="range" min="0" max="10" value={painScale}
                onChange={e => setPainScale(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-800"
                style={{ accentColor: painScale >= 7 ? '#f87171' : painScale >= 4 ? '#fbbf24' : '#2dd4bf' }}
              />
              <div className="flex justify-between font-mono text-[9px] text-slate-500 tracking-wide">
                <span>[0] SIN SINTOMATOLOGÍA</span>
                <span>MODERADO</span>
                <span>[10] MÁXIMO DOLOR</span>
              </div>
            </div>

            {/* Motivo de Consulta */}
            <div>
              <label className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                Sintomatología / Anamnesis de Urgencia
              </label>
              <textarea
                required
                value={symptomsDescription}
                onChange={e => setSymptomsDescription(e.target.value)}
                className="w-full bg-[#020813] border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500/40 transition-colors resize-none"
                style={{ minHeight: '95px' }}
                placeholder="Describa el cuadro clínico actual del paciente detalladamente..."
              />
            </div>

            {/* Botón de Envío Crítico con gradiente Rojo/Naranja */}
            <button
              type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-[#ff7a1a] text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg shadow-red-500/10"
            >
              {loading ? <Loader /> : (
                <>
                  <Activity size={15} />
                  Calcular Score Manchester & Encolar
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};