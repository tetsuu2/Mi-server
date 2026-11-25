import React from 'react';
import {BLACK, MONTSERRAT} from '../theme';

export const PHONE_W = 540;
export const PHONE_H = 1010;
export const BEZEL = 16;
export const SCREEN_W = PHONE_W - BEZEL * 2;
export const SCREEN_H = PHONE_H - BEZEL * 2;

// Celular "pixel": cuerpo oscuro, bordes gruesos, sombra dura sin blur y notch.
export const Phone: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  screenBg?: string;
}> = ({children, style, screenBg = '#FFFFFF'}) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      background: '#1C1B22',
      borderRadius: 70,
      padding: BEZEL,
      boxSizing: 'border-box',
      border: `8px solid ${BLACK}`,
      boxShadow: `22px 22px 0 rgba(10,10,10,0.45)`,
      position: 'relative',
      ...style,
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        background: screenBg,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
      {/* Notch */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: 170,
          height: 36,
          marginLeft: -85,
          background: '#1C1B22',
          borderBottomLeftRadius: 22,
          borderBottomRightRadius: 22,
          zIndex: 10,
        }}
      />
    </div>
    {/* Brillo lateral pixel */}
    <div
      style={{
        position: 'absolute',
        top: 120,
        left: 2,
        width: 6,
        height: 140,
        background: '#3A3944',
      }}
    />
  </div>
);

export const StatusBar: React.FC<{dark?: boolean}> = ({dark}) => {
  const c = dark ? '#FFFFFF' : '#111111';
  return (
    <div
      style={{
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 34px 0 40px',
        fontFamily: MONTSERRAT,
        fontWeight: 700,
        fontSize: 21,
        color: c,
      }}
    >
      <span>9:41</span>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 4}}>
        {[8, 12, 16, 20].map((h) => (
          <div key={h} style={{width: 5, height: h, background: c}} />
        ))}
        <div
          style={{
            marginLeft: 8,
            width: 34,
            height: 17,
            border: `3px solid ${c}`,
            borderRadius: 5,
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          <div style={{width: '70%', height: '100%', background: c}} />
        </div>
      </div>
    </div>
  );
};
