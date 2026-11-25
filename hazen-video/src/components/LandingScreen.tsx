import React from 'react';
import type {RubroContent} from '../content';
import {ACCENT, BLACK, MONTSERRAT, PIXEL, readableOn} from '../theme';
import {PixelSprite} from './PixelSprite';
import {PIN, RUBRO_ICON} from './sprites';
import {StatusBar} from './Phone';

// Landing de ejemplo que se arma bloque por bloque.
// `blocks[i]` es el progreso (0..1, spring) de cada bloque:
// 0 header, 1 hero, 2-4 servicios, 5 botón, 6 ubicación.

const enter = (p: number): React.CSSProperties => ({
  opacity: Math.min(1, p * 2.5),
  transform: `translateY(${(1 - p) * 140}px)`,
});

const ChatIcon: React.FC<{color: string}> = ({color}) => (
  <div style={{position: 'relative', width: 34, height: 34}}>
    <div style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${color}`, boxSizing: 'border-box'}} />
    <div
      style={{
        position: 'absolute',
        left: -2,
        bottom: -3,
        width: 14,
        height: 14,
        background: color,
        clipPath: 'polygon(0 100%, 30% 0, 100% 60%)',
      }}
    />
    <div style={{position: 'absolute', left: 9, top: 14, width: 4, height: 4, background: color}} />
    <div style={{position: 'absolute', left: 15, top: 14, width: 4, height: 4, background: color}} />
    <div style={{position: 'absolute', left: 21, top: 14, width: 4, height: 4, background: color}} />
  </div>
);

const MiniMap: React.FC<{pinBounce: number}> = ({pinBounce}) => (
  <div
    style={{
      position: 'relative',
      height: 250,
      borderRadius: 18,
      border: `4px solid ${BLACK}`,
      boxShadow: `6px 6px 0 ${BLACK}`,
      overflow: 'hidden',
      background: '#EFE8D8',
    }}
  >
    {/* río */}
    <div style={{position: 'absolute', left: -60, top: 170, width: 700, height: 46, background: '#8EC5E8', transform: 'rotate(-12deg)'}} />
    {/* plaza */}
    <div style={{position: 'absolute', left: 54, top: 30, width: 120, height: 90, background: '#A8D5A2', borderRadius: 8}} />
    <div style={{position: 'absolute', left: 300, top: 120, width: 90, height: 60, background: '#A8D5A2', borderRadius: 8}} />
    {/* calles */}
    {[0, 1, 2].map((k) => (
      <div key={`h${k}`} style={{position: 'absolute', left: 0, right: 0, top: 10 + k * 70, height: 12, background: '#FFFFFF'}} />
    ))}
    {[0, 1, 2, 3, 4].map((k) => (
      <div key={`v${k}`} style={{position: 'absolute', top: 0, bottom: 0, left: 20 + k * 100, width: 12, background: '#FFFFFF'}} />
    ))}
    {/* avenida */}
    <div style={{position: 'absolute', top: 0, bottom: 0, left: 222, width: 20, background: '#F7D774'}} />
    <div style={{position: 'absolute', left: 0, right: 0, top: 80, height: 20, background: '#F7D774'}} />
    {/* pin */}
    <div style={{position: 'absolute', left: 212, top: 18 - pinBounce * 18}}>
      <PixelSprite sprite={PIN} px={7} />
    </div>
    <div style={{position: 'absolute', left: 218, top: 92, width: 36, height: 10, borderRadius: '50%', background: 'rgba(0,0,0,0.25)'}} />
  </div>
);

export const LandingScreen: React.FC<{
  content: RubroContent;
  blocks: number[];
  scroll: number;
  pulse: number;
  pinBounce: number;
}> = ({content, blocks, scroll, pulse, pinBounce}) => {
  const L = content.landing;
  const icon = RUBRO_ICON[content.icon];
  const ctaText = readableOn(ACCENT);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#FAFAF7', overflow: 'hidden', fontFamily: MONTSERRAT}}>
      <div style={{transform: `translateY(${-scroll}px)`}}>
        <StatusBar />
        {/* Header */}
        <div
          style={{
            ...enter(blocks[0]),
            height: 78,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '0 24px',
            borderBottom: `4px solid ${BLACK}`,
            background: '#FFFFFF',
          }}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 12,
              background: ACCENT,
              border: `3px solid ${BLACK}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <PixelSprite sprite={icon} px={3} />
          </div>
          <div style={{flex: 1, fontWeight: 800, fontSize: 21, color: BLACK, whiteSpace: 'nowrap'}}>{L.header}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
            {[0, 1, 2].map((k) => (
              <div key={k} style={{width: 28, height: 5, background: BLACK}} />
            ))}
          </div>
        </div>

        {/* Hero */}
        <div style={{padding: '18px 18px 0'}}>
          <div
            style={{
              ...enter(blocks[1]),
              background: BLACK,
              borderRadius: 24,
              padding: '30px 26px 28px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{position: 'absolute', right: 22, top: 24, opacity: 0.95}}>
              <PixelSprite sprite={icon} px={7} />
            </div>
            <div style={{fontFamily: PIXEL, fontSize: 16, color: ACCENT, letterSpacing: 1}}>RESISTENCIA · CHACO</div>
            <div style={{fontWeight: 900, fontSize: 46, lineHeight: 1.02, color: '#FFFFFF', marginTop: 12, maxWidth: 300}}>{L.hero}</div>
            <div style={{width: 90, height: 8, background: ACCENT, marginTop: 16}} />
            <div style={{fontWeight: 600, fontSize: 18, color: '#BDBDBD', marginTop: 14}}>{L.sub}</div>
          </div>
        </div>

        {/* Servicios */}
        <div style={{padding: '22px 22px 0'}}>
          <div style={{...enter(blocks[2]), fontWeight: 900, fontSize: 27, color: BLACK, marginBottom: 12}}>{L.servicesTitle}</div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            {L.services.map((s, i) => (
              <div
                key={s}
                style={{
                  ...enter(blocks[2 + i]),
                  height: 74,
                  borderRadius: 16,
                  border: `4px solid ${BLACK}`,
                  boxShadow: `5px 5px 0 ${BLACK}`,
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '0 18px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: ACCENT,
                    border: `3px solid ${BLACK}`,
                    boxSizing: 'border-box',
                    fontFamily: PIXEL,
                    fontWeight: 700,
                    fontSize: 22,
                    color: ctaText,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i + 1}
                </div>
                <div style={{flex: 1, fontWeight: 800, fontSize: 24, color: BLACK}}>{s}</div>
                <div style={{fontWeight: 900, fontSize: 32, color: BLACK}}>›</div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón */}
        <div style={{padding: '24px 22px 0', ...enter(blocks[5])}}>
          <div style={{position: 'relative'}}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 44,
                border: `5px solid ${ACCENT}`,
                transform: `scale(${1 + pulse * 0.12}, ${1 + pulse * 0.4})`,
                opacity: 1 - pulse,
              }}
            />
            <div
              style={{
                height: 88,
                borderRadius: 44,
                background: ACCENT,
                border: `4px solid ${BLACK}`,
                boxShadow: `6px 6px 0 ${BLACK}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                transform: `scale(${1 + Math.sin(pulse * Math.PI) * 0.045})`,
                boxSizing: 'border-box',
              }}
            >
              <ChatIcon color={ctaText} />
              <div style={{fontWeight: 900, fontSize: 24, color: ctaText}}>{L.cta}</div>
            </div>
          </div>
        </div>

        {/* Ubicación */}
        <div style={{padding: '28px 22px 0', ...enter(blocks[6])}}>
          <div style={{fontWeight: 900, fontSize: 27, color: BLACK, marginBottom: 12}}>Dónde estamos</div>
          <MiniMap pinBounce={pinBounce} />
          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 18, fontWeight: 700, color: '#333'}}>
            <span>{L.address}</span>
            <span style={{color: '#777'}}>{L.hours}</span>
          </div>
        </div>

        <div style={{padding: '30px 0 60px', textAlign: 'center', fontFamily: PIXEL, fontSize: 16, color: '#999', ...enter(blocks[6])}}>
          HECHA CON <span style={{color: BLACK, fontWeight: 700}}>HAZEN</span>
        </div>
      </div>
    </div>
  );
};
