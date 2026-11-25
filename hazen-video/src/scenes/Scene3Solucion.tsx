import React from 'react';
import {AbsoluteFill, Easing, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {pop, ramp, rise} from '../anim';
import {Billboard} from '../components/Billboard';
import {CaptionBox} from '../components/Caption';
import {CityBackdrop} from '../components/CityBackdrop';
import {Facade} from '../components/Facade';
import {FlyingBird} from '../components/FlyingBird';
import {LandingScreen} from '../components/LandingScreen';
import {Phone, PHONE_W} from '../components/Phone';
import type {RubroContent} from '../content';
import {ACCENT, MONTSERRAT, PIXEL} from '../theme';
import {BEATS, beatIn, block} from '../timings';

const FLASH = 3;

// Encendido con parpadeo de un reflector.
const lampOn = (frame: number, at: number) => {
  const t = frame - at;
  if (t < 0) return 0;
  if (t < 2) return 1;
  if (t < 4) return 0.2;
  return 1;
};

export const HazenBillboardShot: React.FC<{tint?: 'bright' | 'night'}> = ({tint = 'bright'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drop = rise(frame, fps, 0);
  const top = 560;
  return (
    <AbsoluteFill>
      <CityBackdrop tint={tint} pan={420} />
      <FlyingBird y={330} start={0} speed={14} dir={-1} />
      <Facade top={top + 80 + 420 + 150} seed="b3" night={tint === 'night'} />
      <div style={{position: 'absolute', left: 70, top, transform: `translateY(${(1 - drop) * -900}px)`}}>
        <Billboard width={940} height={420} lamps={[lampOn(frame, 8), lampOn(frame, 11), lampOn(frame, 14)]}>
          <div
            style={{
              fontFamily: MONTSERRAT,
              fontWeight: 900,
              fontSize: 230,
              lineHeight: 1,
              color: ACCENT,
              letterSpacing: '0.05em',
              textShadow: `0 0 40px ${ACCENT}66, 10px 10px 0 rgba(0,0,0,0.5)`,
              transform: `scale(${0.6 + 0.4 * pop(frame, fps, 4)})`,
            }}
          >
            HAZEN
          </div>
          <div style={{fontFamily: PIXEL, fontSize: 32, color: '#FFFFFF', marginTop: 18, letterSpacing: 2}}>
            PÁGINAS WEB PARA PROFESIONALES
          </div>
        </Billboard>
      </div>
    </AbsoluteFill>
  );
};

const LandingShot: React.FC<{content: RubroContent; offset: number}> = ({content, offset}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // Beats relativos a este sub-bloque
  const rel = (s: number) => beatIn('B3', s) - offset;
  const services = rel(BEATS.b3Services);
  const button = rel(BEATS.b3Button);
  const map = rel(BEATS.b3Map);

  const blocks = [
    rise(frame, fps, 6),
    rise(frame, fps, 12),
    rise(frame, fps, services),
    rise(frame, fps, services + 6),
    rise(frame, fps, services + 12),
    rise(frame, fps, button),
    rise(frame, fps, map),
  ];
  const scroll = ramp(frame, map - 8, map + 34, Easing.inOut(Easing.cubic)) * 340;
  const pulse = frame >= button + 10 ? ((frame - button - 10) % 26) / 26 : 0;
  const pinBounce = frame >= map ? Math.abs(Math.sin((frame - map) / 5)) * Math.max(0, 1 - (frame - map) / 60) : 0;

  const count = Math.round(ramp(frame, 4, services, Easing.out(Easing.quad)) * 72);
  const countPop = pop(frame, fps, services);
  const phoneIn = rise(frame, fps, 0);

  return (
    <AbsoluteFill>
      <CityBackdrop tint="bright" pan={640} />
      <div
        style={{
          position: 'absolute',
          left: (1080 - PHONE_W) / 2,
          top: 590,
          transform: `translateY(${(1 - phoneIn) * 800 + Math.sin(frame / 16) * 5}px)`,
        }}
      >
        <Phone>
          <LandingScreen content={content} blocks={blocks} scroll={scroll} pulse={pulse} pinBounce={pinBounce} />
        </Phone>
      </div>
      <div style={{position: 'absolute', top: 262, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
        <CaptionBox size={66} appear={pop(frame, fps, 0)} rotate={-4}>
          TU PÁGINA LISTA EN
        </CaptionBox>
        <CaptionBox
          size={112}
          appear={pop(frame, fps, 3)}
          rotate={4}
          color={ACCENT}
          style={{
            fontVariantNumeric: 'tabular-nums',
            transform: `scale(${(0.55 + 0.45 * pop(frame, fps, 3)) * (1 + (frame >= services ? 0.12 * (1 - countPop) : 0))})`,
          }}
        >
          {count} HS
        </CaptionBox>
      </div>
    </AbsoluteFill>
  );
};

export const Scene3Solucion: React.FC<{content: RubroContent}> = ({content}) => {
  const frame = useCurrentFrame();
  const phoneAt = beatIn('B3', BEATS.b3Phone);
  const total = block('B3').durationInFrames;
  return (
    <AbsoluteFill>
      <Sequence from={FLASH} durationInFrames={phoneAt - FLASH}>
        <HazenBillboardShot />
      </Sequence>
      <Sequence from={phoneAt} durationInFrames={total - phoneAt}>
        <LandingShot content={content} offset={phoneAt} />
      </Sequence>
      {frame < FLASH ? <AbsoluteFill style={{background: '#FFFFFF'}} /> : null}
    </AbsoluteFill>
  );
};
