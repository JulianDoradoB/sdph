import React from 'react';
import { Pill, FlaskConical, Truck, BarChart3 } from 'lucide-react';

export const Pharmacy: React.FC = () => {
  const modules = [
    {
      icon: Pill,
      title: 'Despacho de Recetas',
      desc: 'Despacho atómico de prescripciones médicas con validación de interacciones farmacológicas bajo estándar HL7.',
      status: 'Sprint 6',
      textColor: 'text-[#00f0ff]',
      bgIcon: 'bg-cyan-500/10',
      borderIcon: 'border-cyan-500/20',
      glowClass: 'hover:border-cyan-500/30 shadow-cyan-500/5',
    },
    {
      icon: FlaskConical,
      title: 'Inventario Cruzado',
      desc: 'Control de stock en tiempo real con alertas automáticas de desabastecimiento y caducidad.',
      status: 'Sprint 7',
      textColor: 'text-[#00d4af]',
      bgIcon: 'bg-teal-500/10',
      borderIcon: 'border-teal-500/20',
      glowClass: 'hover:border-teal-500/30 shadow-teal-500/5',
    },
    {
      icon: Truck,
      title: 'Cadena de Suministro',
      desc: 'Integración con proveedores farmacéuticos y sistema de pedidos automatizados.',
      status: 'Sprint 8',
      textColor: 'text-blue-400',
      bgIcon: 'bg-blue-500/10',
      borderIcon: 'border-blue-500/20',
      glowClass: 'hover:border-blue-500/30 shadow-blue-500/5',
    },
    {
      icon: BarChart3,
      title: 'Analítica de Consumo',
      desc: 'Reportes de consumo por servicio, rotación de inventario y proyección de demanda.',
      status: 'Sprint 9',
      textColor: 'text-amber-400',
      bgIcon: 'bg-amber-500/10',
      borderIcon: 'border-amber-500/20',
      glowClass: 'hover:border-amber-400/30 shadow-amber-500/5',
    },
  ];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto p-4 text-slate-100">
      
      {/* Header del Módulo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-slate-800/60">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00f0ff] mb-1">
            // LOGÍSTICA CLÍNICA Y CONTROL BIOMÉDICO
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Suministros Médicos & Farmacia
          </h1>
        </div>
      </div>

      {/* Banner Principal - Estado de Desarrollo */}
      <div className="bg-[#060e1c] border border-slate-800 rounded-xl p-6 shadow-2xl relative overflow-hidden mb-6 animate-fade-up">
        {/* Efecto de luz de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 bg-radial gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        {/* Línea de acento superior estilo cyber */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f0ff] to-blue-600" />
        
        <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-cyan-500/10 border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
            <Pill size={22} className="text-[#00f0ff]" />
          </div>
          
          <div className="space-y-1 flex-1">
            <h2 className="text-base font-semibold text-white tracking-wide">
              Control de Inventario Farmacéutico
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
              Módulo en desarrollo activo. Permitirá el despacho atómico de recetas médicas, validación automatizada de interacciones farmacológicas bajo el estándar internacional <span className="text-[#00f0ff] font-mono">HL7</span> y la gestión inteligente de la cadena de suministro hospitalaria.
            </p>
          </div>

          <div className="mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto text-right">
            <span className="inline-block font-mono text-[10px] tracking-wider px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold shadow-inner">
              // EN DESARROLLO ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Próximos Módulos / Sprints */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {modules.map(({ icon: Icon, title, desc, status, textColor, bgIcon, borderIcon, glowClass }) => (
          <div
            key={title}
            className={`bg-[#060e1c]/70 border border-slate-800/80 rounded-xl p-5 transition-all duration-300 hover:bg-[#060e1c] hover:-translate-y-0.5 shadow-lg ${glowClass}`}
          >
            <div className="flex items-start gap-4">
              {/* Contenedor del Icono */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgIcon} border ${borderIcon}`}>
                <Icon size={18} className={textColor} />
              </div>
              
              {/* Contenido */}
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-medium text-slate-200 tracking-wide">
                    {title}
                  </h3>
                  <span className="font-mono text-[9px] text-slate-500 tracking-widest uppercase bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">
                    {status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
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