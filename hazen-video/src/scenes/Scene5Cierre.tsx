import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {pop} from '../anim';
import {CaptionBox} from '../components/Caption';
import {CityBackdrop} from '../components/CityBackdrop';
import {PixelSprite} from '../components/PixelSprite';
import {ARROW_UP} from '../components/sprites';
import {ACCENT, MONTSERRAT, PIXEL} from '../theme';

const Sparkle: React.FC<{x: number; y: number; t: number}> = ({x, y, t}) => {
  const s = Math.max(0, Math.sin(t));
  return (
    <div style={{position: 'absolute', left: x, top: y, opacity: s, transform: `scale(${0.5 + s * 0.5})`}}>
      <div style={{position: 'absolute', left: 12, top: 0, width: 8, height: 32, background: ACCENT}} />
      <div style={{position: 'absolute', left: 0, top: 12, width: 32, height: 8, background: ACCENT}} />
    </div>
  );
};

export const Scene5Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logo = pop(frame, fps, 0);
  const pulse = 1 + 0.035 * Math.sin(frame / 4.5);
  const bob = -Math.abs(Math.sin(frame / 6)) * 46;
  const arrowIn = pop(frame, fps, 10);

  return (
    <AbsoluteFill>
      <CityBackdrop tint="night" pan={900} dim={0.15} />
      {Array.from({length: 7}).map((_, i) => (
        <Sparkle key={i} x={120 + random(`sx${i}`) * 800} y={420 + random(`sy${i}`) * 420} t={frame / 6 + i * 1.9} />
      ))}
      <div style={{position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <div style={{transform: `translateY(${bob}px) scale(${arrowIn})`, position: 'relative'}}>
          <div style={{position: 'absolute', top: 40, opacity: 0.25}}>
            <PixelSprite sprite={ARROW_UP} px={18} />
          </div>
          <PixelSprite sprite={ARROW_UP} px={18} />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 560,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: MONTSERRAT,
          fontWeight: 900,
          fontSize: 250,
          lineHeight: 1,
          letterSpacing: '0.05em',
          color: ACCENT,
          textShadow: `0 0 ${30 + 20 * Math.sin(frame / 4.5)}px ${ACCENT}AA, 12px 12px 0 rgba(0,0,0,0.55)`,
          transform: `scale(${(0.5 + 0.5 * logo) * pulse})`,
        }}
      >
        HAZEN
      </div>
      <div
        style={{
          position: 'absolute',
          top: 840,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: PIXEL,
          fontSize: 36,
          letterSpacing: 2,
          color: '#FFFFFF',
          opacity: pop(frame, fps, 5),
        }}
      >
        PÁGINAS WEB PARA PROFESIONALES
      </div>
      <div style={{position: 'absolute', top: 960, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
        <CaptionBox size={76} appear={pop(frame, fps, 8)} rotate={-5}>
          LINK EN EL PERFIL 👆
        </CaptionBox>
      </div>
    </AbsoluteFill>
  );
};
