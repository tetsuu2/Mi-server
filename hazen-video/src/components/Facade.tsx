import React from 'react';
import {random} from 'remotion';

// Fachada de ladrillo pixel (para poner debajo de los carteles).
export const Facade: React.FC<{
  top: number;
  left?: number;
  width?: number;
  seed?: string;
  night?: boolean;
}> = ({top, left = 40, width = 1000, seed = 'f', night}) => {
  const brick = night ? '#4E3038' : '#8C5645';
  const dark = night ? '#3A232B' : '#6C3E33';
  const trim = night ? '#6B4650' : '#B57A5F';
  const win = night ? '#1C1219' : '#3B2427';
  const lit = night ? '#FFC56B' : '#F3B866';
  const cols = Math.floor((width - 60) / 150);
  const rows = 6;
  const gap = (width - cols * 96) / (cols + 1);
  return (
    <div style={{position: 'absolute', top, left, width, height: 1920 - top, background: brick, boxShadow: `inset 0 18px 0 ${dark}`}}>
      <div style={{position: 'absolute', top: -14, left: -12, right: -12, height: 16, background: trim}} />
      {Array.from({length: rows}).map((_, r) =>
        Array.from({length: cols}).map((__, c) => {
          const on = random(`${seed}-${r}-${c}`) < 0.35;
          return (
            <div
              key={`${r}-${c}`}
              style={{
                position: 'absolute',
                left: gap + c * (96 + gap),
                top: 70 + r * 170,
                width: 96,
                height: 116,
                background: on ? lit : win,
                border: `8px solid ${trim}`,
                boxSizing: 'border-box',
              }}
            >
              <div style={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 5, marginLeft: -2, background: dark}} />
              <div style={{position: 'absolute', left: -20, right: -20, bottom: -14, height: 10, background: dark}} />
            </div>
          );
        }),
      )}
    </div>
  );
};
