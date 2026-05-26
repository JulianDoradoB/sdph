import React from 'react';
import { ManchesterLevel } from '../../types';

const config: Record<ManchesterLevel, { label: string; className: string; dot: string }> = {
  [ManchesterLevel.RED]:    { label: 'INMEDIATO',  className: 'badge-red',    dot: '#ff3b3b' },
  [ManchesterLevel.ORANGE]: { label: 'MUY URGENTE', className: 'badge-orange', dot: '#ff7a1a' },
  [ManchesterLevel.YELLOW]: { label: 'URGENTE',    className: 'badge-yellow', dot: '#f5c518' },
  [ManchesterLevel.GREEN]:  { label: 'NORMAL',     className: 'badge-green',  dot: '#00c97a' },
  [ManchesterLevel.BLUE]:   { label: 'NO URGENTE', className: 'badge-blue',   dot: '#3b9eff' },
};

export const Badge: React.FC<{ level: ManchesterLevel }> = ({ level }) => {
  const cfg = config[level] || config[ManchesterLevel.BLUE];
  return (
    <span className={cfg.className} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
      <span
        style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: cfg.dot, display: 'inline-block', flexShrink: 0
        }}
      />
      {cfg.label}
    </span>
  );
};
