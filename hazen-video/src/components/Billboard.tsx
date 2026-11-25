import React from 'react';
import {BLACK} from '../theme';

// Cartel publicitario pixel sobre una terraza, con reflectores que se prenden.
export const Billboard: React.FC<{
  width: number;
  height: number;
  lamps: number[]; // 0..1 por reflector
  children: React.ReactNode;
  board?: string;
  frame?: string;
}> = ({width, height, lamps, children, board = BLACK, frame = '#2B2A33'}) => {
  const legH = 150;
  return (
    <div style={{position: 'relative', width, height: height + legH + 90}}>
      {/* Reflectores */}
      {lamps.map((on, i) => {
        const x = ((i + 1) / (lamps.length + 1)) * width;
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left: x - 140,
                top: 64,
                width: 280,
                height: height * 0.9,
                background: `linear-gradient(180deg, rgba(255,236,170,${0.55 * on}) 0%, rgba(255,236,170,0) 85%)`,
                clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)',
                zIndex: 3,
                mixBlendMode: 'screen',
              }}
            />
            <div style={{position: 'absolute', left: x - 6, top: 40, width: 12, height: 50, background: frame, zIndex: 4}} />
            <div
              style={{
                position: 'absolute',
                left: x - 32,
                top: 20,
                width: 64,
                height: 30,
                background: frame,
                borderBottom: `10px solid ${on > 0.5 ? '#FFF2C2' : '#55535E'}`,
                boxShadow: on > 0.5 ? `0 18px 40px 14px rgba(255,236,170,${0.6 * on})` : undefined,
                zIndex: 4,
              }}
            />
          </React.Fragment>
        );
      })}
      {/* Tablero */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 0,
          width,
          height,
          background: board,
          border: `14px solid ${frame}`,
          boxSizing: 'border-box',
          boxShadow: `16px 16px 0 rgba(10,10,10,0.4)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {children}
      </div>
      {/* Patas y travesaños */}
      {[0.2, 0.8].map((f) => (
        <div key={f} style={{position: 'absolute', top: 80 + height, left: width * f - 14, width: 28, height: legH, background: frame}} />
      ))}
      <div style={{position: 'absolute', top: 80 + height + legH * 0.45, left: width * 0.2, width: width * 0.6, height: 16, background: frame}} />
    </div>
  );
};
