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

  const [systolicBp, setSystolicBp]       = useState<number>(120);
  const [diastolicBp, setDiastolicBp]     = useState<number>(80);
  const [heartRate, setHeartRate]         = useState<number>(80);
  const [respiratoryRate, setRespiratoryRate] = useState<number>(16);
  const [temperature, setTemperature]     = useState<number>(36.5);
  const [oxygenSaturation, setOxygenSaturation] = useState<number>(98);
  const [painScale, setPainScale]         = useState<number>(0);
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
      // Reset
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
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Header */}
      <div className="sdp-section-header">
        <div>
          <div className="font-mono mb-1" style={{ color: 'var(--accent-cyan)', fontSize: '10px', letterSpacing: '0.15em' }}>
            // ADMISIÓN CLÍNICA
          </div>
          <h1 className="sdp-section-title" style={{ fontSize: '20px' }}>
            Registro de Pacientes & Triage
          </h1>
        </div>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-0 mb-8">
        {[
          { n: 1, label: 'Identidad' },
          { n: 2, label: 'Constantes Vitales' },
        ].map(({ n, label }, i) => (
          <React.Fragment key={n}>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-600 flex-shrink-0"
                style={{
                  background: step >= n
                    ? 'linear-gradient(135deg, #1a78ff, #0044cc)'
                    : 'var(--bg-elevated)',
                  border: step >= n
                    ? '1px solid rgba(26,120,255,0.5)'
                    : '1px solid var(--border-dim)',
                  color: step >= n ? '#fff' : 'var(--text-dim)',
                  boxShadow: step >= n ? '0 0 12px rgba(26,120,255,0.25)' : 'none'
                }}
              >
                {n}
              </div>
              <span
                className="text-xs font-500 hidden sm:block"
                style={{ color: step >= n ? 'var(--text-primary)' : 'var(--text-dim)' }}
              >
                {label}
              </span>
            </div>
            {i < 1 && (
              <div
                className="flex-1 mx-4 h-px"
                style={{
                  background: step > 1
                    ? 'var(--accent-blue)'
                    : 'var(--border-dim)'
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Paso 1 */}
      {step === 1 && (
        <div className="sdp-card animate-fade-up">
          <div
            className="flex items-center gap-3 pb-4 mb-6"
            style={{ borderBottom: '1px solid var(--border-dim)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(26,120,255,0.1)', border: '1px solid rgba(26,120,255,0.2)' }}
            >
              <UserPlus size={14} style={{ color: 'var(--accent-blue)' }} />
            </div>
            <div>
              <h2 className="font-display text-sm font-700" style={{ color: 'var(--text-primary)' }}>
                Validación de Identidad
              </h2>
              <p className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.08em' }}>
                DNI · DATOS DEMOGRÁFICOS
              </p>
            </div>
          </div>

          <form onSubmit={handleFindOrCreatePatient} className="space-y-5">
            <div>
              <label className="sdp-label">DNI / Documento de Identidad</label>
              <input
                type="text" required value={dni}
                onChange={e => setDni(e.target.value)}
                className="sdp-input" placeholder="Número de documento"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="sdp-label">Nombres</label>
                <input
                  type="text" required value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  className="sdp-input"
                />
              </div>
              <div>
                <label className="sdp-label">Apellidos</label>
                <input
                  type="text" required value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="sdp-input"
                />
              </div>
              <div>
                <label className="sdp-label">Fecha de Nacimiento</label>
                <input
                  type="date" required value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  className="sdp-input"
                />
              </div>
              <div>
                <label className="sdp-label">Género Clínico</label>
                <select value={gender} onChange={e => setGender(e.target.value)} className="sdp-select">
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="sdp-btn-primary flex items-center justify-center gap-2"
            >
              {loading ? <Loader /> : (
                <>
                  Validar & Continuar
                  <ChevronRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Paso 2 */}
      {step === 2 && (
        <div className="sdp-card animate-fade-up">
          <div
            className="flex items-center justify-between pb-4 mb-6"
            style={{ borderBottom: '1px solid var(--border-dim)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255,59,59,0.1)', border: '1px solid rgba(255,59,59,0.2)' }}
              >
                <Activity size={14} style={{ color: 'var(--red-critical)' }} />
              </div>
              <div>
                <h2 className="font-display text-sm font-700" style={{ color: 'var(--text-primary)' }}>
                  Constantes Vitales
                </h2>
                <p className="font-mono" style={{ color: 'var(--text-dim)', fontSize: '10px', letterSpacing: '0.08em' }}>
                  {patientFound ? '✓ PACIENTE ENCONTRADO' : 'NUEVO PACIENTE'} · {firstName.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              type="button" onClick={() => setStep(1)}
              className="flex items-center gap-1 text-xs"
              style={{ color: 'var(--text-muted)', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ChevronLeft size={14} /> Volver
            </button>
          </div>

          <form onSubmit={handleTriageSubmit} className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'P. Sistólica (mmHg)',   value: systolicBp,       setter: setSystolicBp,       type: 'number', step: '1' },
                { label: 'P. Diastólica (mmHg)',  value: diastolicBp,      setter: setDiastolicBp,      type: 'number', step: '1' },
                { label: 'Frec. Cardíaca (lpm)',  value: heartRate,        setter: setHeartRate,        type: 'number', step: '1' },
                { label: 'Frec. Respiratoria',    value: respiratoryRate,  setter: setRespiratoryRate,  type: 'number', step: '1' },
                { label: 'Saturación O₂ (%)',     value: oxygenSaturation, setter: setOxygenSaturation, type: 'number', step: '1',  max: 100 },
                { label: 'Temperatura (°C)',       value: temperature,      setter: setTemperature,      type: 'number', step: '0.1' },
              ].map(({ label, value, setter, step: s, max }) => (
                <div key={label}>
                  <label className="sdp-label">{label}</label>
                  <input
                    type="number"
                    required
                    step={s}
                    max={max}
                    value={value}
                    onChange={e => (setter as any)(Number(e.target.value))}
                    className="sdp-input font-mono"
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  />
                </div>
              ))}
            </div>

            {/* Dolor — slider visual */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="sdp-label" style={{ marginBottom: 0 }}>Escala de Dolor</label>
                <span
                  className="font-mono font-600"
                  style={{
                    color: painScale >= 7 ? 'var(--red-critical)' :
                           painScale >= 4 ? 'var(--orange-high)' : 'var(--accent-teal)',
                    fontSize: '14px'
                  }}
                >
                  {painScale}/10
                </span>
              </div>
              <input
                type="range" min="0" max="10" value={painScale}
                onChange={e => setPainScale(Number(e.target.value))}
                style={{ width: '100%', accentColor: painScale >= 7 ? '#ff3b3b' : painScale >= 4 ? '#ff7a1a' : '#00e5b0' }}
              />
              <div className="flex justify-between font-mono" style={{ color: 'var(--text-dim)', fontSize: '9px', letterSpacing: '0.08em', marginTop: '4px' }}>
                <span>SIN DOLOR</span>
                <span>MODERADO</span>
                <span>SEVERO</span>
              </div>
            </div>

            {/* Síntomas */}
            <div>
              <label className="sdp-label">Sintomatología / Motivo de Consulta</label>
              <textarea
                required
                value={symptomsDescription}
                onChange={e => setSymptomsDescription(e.target.value)}
                className="sdp-textarea"
                style={{ minHeight: '88px' }}
                placeholder="Detalle clínico de los síntomas del paciente..."
              />
            </div>

            <button
              type="submit" disabled={loading}
              className="sdp-btn-danger flex items-center justify-center gap-2"
            >
              {loading ? <Loader /> : (
                <>
                  <Activity size={14} />
                  Calcular Score Manchester & Guardar
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
