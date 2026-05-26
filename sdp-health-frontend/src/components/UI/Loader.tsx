import React from 'react';

const Loader: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <span
    style={{
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.15)',
      borderTopColor: '#fff',
      animation: 'spin 0.7s linear infinite',
    }}
  />
);

export default Loader;
