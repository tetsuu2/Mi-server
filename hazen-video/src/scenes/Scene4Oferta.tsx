import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {formatAR, pop, ramp} from '../anim';
import {Billboard} from '../components/Billboard';
import {CaptionBox} from '../components/Caption';
import {CityBackdrop} from '../components/CityBackdrop';
import {Facade} from '../components/Facade';
import {ACCENT, BLACK, MONTSERRAT, PIXEL} from '../theme';
import {BEATS, beatIn} from '../timings';

const lampOn = (frame: number, at: number) => (frame - at < 0 ? 0 : frame - at < 2 ? 1 : frame - at < 4 ? 0.2 : 1);

const DrawCheck: React.FC<{progress: number; ring: number; size: number}> = ({progress, ring, size}) => {
  const r = 100;
  const circ = 2 * Math.PI * r;
  const checkLen = 190;
  return (
    <svg width={size} height={size} viewBox="0 0 260 260">
      <circle cx={130} cy={130} r={126} fill={BLACK} />
      <circle
        cx={130}
        cy={130}
        r={r}
        fill="none"
        stroke={ACCENT}
        strokeWidth={20}
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - ring)}
        transform="rotate(-90 130 130)"
        strokeLinecap="square"
      />
      <path
        d="M 82 134 L 116 168 L 180 98"
        fill="none"
        stroke={ACCENT}
        strokeWidth={26}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeDasharray={checkLen}
        strokeDashoffset={checkLen * (1 - progress)}
      />
    </svg>
  );
};

export const Scene4Oferta: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const split = beatIn('B4', BEATS.b4Split);
  const check = beatIn('B4', BEATS.b4Check);

  const countT = ramp(frame, 6, 36, Easing.out(Easing.cubic));
  const price = formatAR(countT * 120000);
  const landed = pop(frame, fps, 36);
  const priceScale = frame >= 36 ? 1 + 0.12 * (1 - landed) : 0.92 + 0.08 * countT;

  const top = 250;
  const boardH = 380;

  const pct = (txt: string) => (
    <>
      <span style={{color: ACCENT}}>50%</span> {txt}
    </>
  );

  return (
    <AbsoluteFill>
      <CityBackdrop tint="dusk" pan={-420} />
      <Facade top={top + 80 + boardH + 150} seed="b4" />
      <div style={{position: 'absolute', left: 60, top, transform: `translateY(${(1 - pop(frame, fps, 0)) * -600}px)`}}>
        <Billboard width={960} height={boardH} lamps={[lampOn(frame, 2), lampOn(frame, 5), lampOn(frame, 8)]}>
          <div style={{fontFamily: PIXEL, fontSize: 36, color: ACCENT, letterSpacing: 3}}>TU LANDING PAGE</div>
          <div
            style={{
              fontFamily: MONTSERRAT,
              fontWeight: 900,
              fontSize: 168,
              lineHeight: 1.05,
              color: '#FFFFFF',
              fontVariantNumeric: 'tabular-nums',
              transform: `scale(${priceScale})`,
              textShadow: '10px 10px 0 rgba(0,0,0,0.5)',
              marginTop: 6,
            }}
          >
            ${price}
          </div>
        </Billboard>
      </div>
      <div style={{position: 'absolute', top: 920, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
        <CaptionBox size={64} appear={pop(frame, fps, split)} rotate={-5}>
          {pct('PARA ARRANCAR')}
        </CaptionBox>
        <div style={{width: 18, height: 18, background: ACCENT, boxShadow: `4px 4px 0 ${BLACK}`, transform: `scale(${pop(frame, fps, split + 3)})`}} />
        <CaptionBox size={64} appear={pop(frame, fps, split + 6)} rotate={5}>
          {pct('AL TERMINAR')}
        </CaptionBox>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 1230,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          transform: `scale(${frame >= check ? 0.5 + 0.5 * pop(frame, fps, check) : 0})`,
        }}
      >
        <DrawCheck size={280} ring={ramp(frame, check, check + 10)} progress={ramp(frame, check + 8, check + 18)} />
      </div>
    </AbsoluteFill>
  );
};
