import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {HEIGHT, WIDTH} from '../timings';

// Ciudad pixel-art al atardecer, al estilo de las animaciones 8-bit:
// cielo degradé, nubes alargadas, skyline lejano con ventanas,
// guirnalda de luces y edificios de ladrillo en primer plano.

export type Tint = 'dusk' | 'night' | 'bright';

const PAL = {
  dusk: {
    sky: ['#3A5383', '#5872A0', '#9A9BB5', '#DDA986', '#F0C190'],
    cloudTop: '#F8D9B6',
    cloudBody: '#EDB88A',
    cloudShade: '#8F9CBD',
    far: '#7E8DAE',
    farWin: '#F3DFB2',
    farWinA: 0.55,
    tower: '#4E363C',
    towerWin: '#2A1E25',
    lit: '#F3B866',
    brick: '#8C5645',
    brickDark: '#6C3E33',
    brickWin: '#3B2427',
    trim: '#B57A5F',
    street: '#2C2A36',
    bulb: '#FFD27A',
    litRatio: 0.38,
  },
  night: {
    sky: ['#121734', '#1F2550', '#3B3866', '#6A4F72', '#8E5F6E'],
    cloudTop: '#6A6790',
    cloudBody: '#4E4C75',
    cloudShade: '#2A2B4D',
    far: '#2E3459',
    farWin: '#FFE3A1',
    farWinA: 0.75,
    tower: '#241C2C',
    towerWin: '#15111B',
    lit: '#FFC56B',
    brick: '#4E3038',
    brickDark: '#3A232B',
    brickWin: '#1C1219',
    trim: '#6B4650',
    street: '#14121C',
    bulb: '#FFD27A',
    litRatio: 0.55,
  },
  bright: {
    sky: ['#4D86C9', '#73A3D8', '#A9C8E6', '#F2D4AE', '#F8E1BE'],
    cloudTop: '#FFFFFF',
    cloudBody: '#F4E9DE',
    cloudShade: '#AFC3DD',
    far: '#93A8C8',
    farWin: '#DCE8F5',
    farWinA: 0.6,
    tower: '#5C4148',
    towerWin: '#3A2930',
    lit: '#F6D08D',
    brick: '#A0644F',
    brickDark: '#7D4A3B',
    brickWin: '#4A2E2F',
    trim: '#C88B6E',
    street: '#3A3846',
    bulb: '#FFE6A8',
    litRatio: 0.2,
  },
};

const HORIZON = 1560;
const STREET = 1800;

type Far = {x: number; w: number; h: number; wins: {x: number; y: number; lit: number}[]};
type Mid = {
  x: number;
  w: number;
  top: number;
  kind: 'tower' | 'brick';
  awning: boolean;
  tank: boolean;
  wins: {x: number; y: number; w: number; h: number}[];
};

const FAR: Far[] = (() => {
  const out: Far[] = [];
  let x = -500;
  let i = 0;
  while (x < 8200) {
    const w = 60 + random(`fw${i}`) * 90;
    const h = 200 + random(`fh${i}`) * 320;
    const wins: Far['wins'] = [];
    for (let yy = 22; yy < h - 30; yy += 30) {
      for (let xx = 12; xx < w - 18; xx += 22) {
        wins.push({x: xx, y: yy, lit: random(`fwin${i}-${xx}-${yy}`)});
      }
    }
    out.push({x, w, h, wins});
    x += w + 6 + random(`fg${i}`) * 18;
    i++;
  }
  return out;
})();

const MID: Mid[] = (() => {
  const out: Mid[] = [];
  let x = -700;
  let i = 0;
  while (x < 8400) {
    const kind: Mid['kind'] = random(`mk${i}`) > 0.5 ? 'tower' : 'brick';
    const w = 300 + random(`mw${i}`) * 140;
    const top = kind === 'tower' ? 1160 + random(`mt${i}`) * 140 : 1260 + random(`mt${i}`) * 140;
    const wins: Mid['wins'] = [];
    if (kind === 'tower') {
      for (let yy = top + 46; yy < STREET - 70; yy += 88) {
        for (let xx = 30; xx < w - 70; xx += 66) {
          wins.push({x: xx, y: yy, w: 44, h: 58});
        }
      }
    } else {
      for (let yy = top + 50; yy < STREET - 230; yy += 140) {
        for (let xx = 36; xx < w - 96; xx += 112) {
          wins.push({x: xx, y: yy, w: 72, h: 92});
        }
      }
    }
    out.push({x, w, top, kind, wins, awning: random(`ma${i}`) > 0.35, tank: random(`mtk${i}`) > 0.5});
    x += w + 14 + random(`mg${i}`) * 30;
    i++;
  }
  return out;
})();

const CLOUDS = [
  {x: 40, y: 120, w: 460, s: 0.25},
  {x: 640, y: 300, w: 560, s: 0.18},
  {x: -60, y: 520, w: 360, s: 0.3},
  {x: 720, y: 700, w: 320, s: 0.22},
  {x: 220, y: 900, w: 480, s: 0.15},
  {x: 820, y: 1060, w: 260, s: 0.28},
];

const Cloud: React.FC<{x: number; y: number; w: number; p: (typeof PAL)['dusk']}> = ({x, y, w, p}) => (
  <g>
    <rect x={x + w * 0.12} y={y + 30} width={w * 0.78} height={16} rx={8} fill={p.cloudShade} />
    <rect x={x} y={y} width={w} height={40} rx={20} fill={p.cloudBody} />
    <rect x={x + w * 0.16} y={y - 18} width={w * 0.5} height={30} rx={15} fill={p.cloudTop} />
    <rect x={x + w * 0.05} y={y + 6} width={w * 0.6} height={10} rx={5} fill={p.cloudTop} opacity={0.6} />
  </g>
);

const wrapX = (x: number, w: number, span: number) => {
  const total = span + w * 2;
  return ((((x + w) % total) + total) % total) - w;
};

export const CityBackdrop: React.FC<{
  tint?: Tint;
  pan?: number;
  drift?: number;
  dim?: number;
  // Modo panorama: todas las capas se mueven igual, así placas contiguas
  // de un carrusel (pan = i * 1080) empalman sin cortes.
  seamless?: boolean;
  // Desplaza el dibujo hacia arriba (para formatos más bajos que 1920).
  offsetY?: number;
}> = ({tint = 'dusk', pan = 0, drift = 0.6, dim = 0, seamless = false, offsetY = 0}) => {
  const frame = useCurrentFrame();
  const p = PAL[tint];
  const cam = pan + frame * drift;

  const farOff = seamless ? -cam : -cam * 0.35;
  const lightsOff = seamless ? -cam : -cam * 0.6;
  const midOff = -cam;
  const dashShift = ((cam % 180) + 180) % 180;
  const clouds = seamless
    ? CLOUDS.flatMap((c, i) =>
        [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => ({key: `${i}-${k}`, x: c.x + k * 1400 + (i % 2) * 300 - cam, y: c.y, w: c.w})),
      ).filter((c) => c.x < WIDTH + 20 && c.x + c.w > -20)
    : CLOUDS.map((c, i) => ({key: `${i}`, x: wrapX(c.x - frame * c.s - pan * 0.1, c.w, WIDTH), y: c.y, w: c.w}));

  // Guirnalda de luces que se repite cada 1100 px
  const garlands: React.ReactNode[] = [];
  for (let g = -1; g < 4; g++) {
    const gx = g * 1100 + 60;
    const x1 = gx;
    const x2 = gx + 760;
    const y1 = 1215;
    const y2 = 1170;
    const cx = (x1 + x2) / 2;
    const cy = 1290;
    const bulbs: React.ReactNode[] = [];
    for (let k = 1; k < 16; k++) {
      const t = k / 16;
      const bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
      const by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
      const tw = 0.75 + 0.25 * Math.sin(frame * 0.25 + k * 1.7);
      bulbs.push(
        <g key={k}>
          <circle cx={bx} cy={by + 6} r={16} fill={p.bulb} opacity={0.22 * tw} />
          <rect x={bx - 5} y={by + 1} width={10} height={10} fill={p.bulb} opacity={tw} />
        </g>,
      );
    }
    garlands.push(
      <g key={g}>
        <rect x={x1 - 6} y={y1 - 10} width={12} height={HORIZON - y1 + 40} fill={p.towerWin} />
        <path d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} stroke={p.towerWin} strokeWidth={3} fill="none" />
        {bulbs}
      </g>,
    );
  }

  return (
    <AbsoluteFill>
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} style={{position: 'absolute', top: -offsetY}}>
        <defs>
          <linearGradient id={`sky-${tint}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sky[0]} />
            <stop offset="0.28" stopColor={p.sky[1]} />
            <stop offset="0.5" stopColor={p.sky[2]} />
            <stop offset="0.68" stopColor={p.sky[3]} />
            <stop offset="0.82" stopColor={p.sky[4]} />
          </linearGradient>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill={`url(#sky-${tint})`} />

        {clouds.map((c) => (
          <Cloud key={c.key} x={c.x} y={c.y} w={c.w} p={p} />
        ))}

        <g shapeRendering="crispEdges">
          {/* Skyline lejano */}
          <g transform={`translate(${farOff} 0)`}>
            {FAR.map((b, i) => (
              <g key={i} transform={`translate(${b.x} ${HORIZON - b.h})`}>
                <rect width={b.w} height={b.h + 400} fill={p.far} />
                {b.wins.map((w, j) =>
                  w.lit < 0.42 ? (
                    <rect key={j} x={w.x} y={w.y} width={10} height={14} fill={p.farWin} opacity={p.farWinA} />
                  ) : null,
                )}
              </g>
            ))}
          </g>

          {/* Guirnalda */}
          <g transform={`translate(${lightsOff} 0)`}>{garlands}</g>

          {/* Edificios de primer plano */}
          <g transform={`translate(${midOff} 0)`}>
            {MID.map((b, i) => (
              <g key={i} transform={`translate(${b.x} 0)`}>
                {b.tank ? (
                  <g>
                    <rect x={b.w * 0.6} y={b.top - 70} width={70} height={56} fill={b.kind === 'tower' ? p.towerWin : p.brickDark} />
                    <rect x={b.w * 0.6 + 8} y={b.top - 14} width={8} height={14} fill={p.towerWin} />
                    <rect x={b.w * 0.6 + 54} y={b.top - 14} width={8} height={14} fill={p.towerWin} />
                  </g>
                ) : null}
                <rect y={b.top} width={b.w} height={STREET - b.top} fill={b.kind === 'tower' ? p.tower : p.brick} />
                <rect y={b.top} width={b.w} height={18} fill={b.kind === 'tower' ? p.towerWin : p.brickDark} />
                <rect x={-8} y={b.top - 10} width={b.w + 16} height={12} fill={b.kind === 'tower' ? p.towerWin : p.trim} />
                {b.wins.map((w, j) => {
                  const lit = random(`lit${i}-${j}`) < p.litRatio;
                  if (b.kind === 'tower') {
                    return (
                      <g key={j}>
                        <rect x={w.x - 4} y={w.y - 4} width={w.w + 8} height={w.h + 8} fill={p.towerWin} />
                        <rect x={w.x} y={w.y} width={w.w} height={w.h} fill={lit ? p.lit : p.towerWin} />
                        {lit ? <rect x={w.x} y={w.y} width={w.w} height={10} fill="#FFFFFF" opacity={0.25} /> : null}
                      </g>
                    );
                  }
                  return (
                    <g key={j}>
                      <rect x={w.x - 6} y={w.y - 6} width={w.w + 12} height={w.h + 12} fill={p.trim} />
                      <rect x={w.x} y={w.y} width={w.w} height={w.h} fill={lit ? p.lit : p.brickWin} />
                      <rect x={w.x + w.w / 2 - 2} y={w.y} width={4} height={w.h} fill={p.brickDark} />
                      {/* Baranda del balcón */}
                      <rect x={w.x - 14} y={w.y + w.h - 30} width={w.w + 28} height={5} fill={p.towerWin} />
                      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
                        <rect key={k} x={w.x - 12 + k * ((w.w + 22) / 6)} y={w.y + w.h - 30} width={4} height={30} fill={p.towerWin} />
                      ))}
                      <rect x={w.x - 14} y={w.y + w.h} width={w.w + 28} height={8} fill={p.brickDark} />
                    </g>
                  );
                })}
                {b.kind === 'brick' && b.awning ? (
                  <g>
                    <rect x={20} y={STREET - 200} width={b.w - 40} height={200} fill={p.brickWin} />
                    <rect x={36} y={STREET - 150} width={b.w - 72} height={150} fill={p.lit} opacity={0.55} />
                    {Array.from({length: Math.ceil((b.w - 20) / 44)}).map((_, k) => (
                      <rect
                        key={k}
                        x={10 + k * 44}
                        y={STREET - 240}
                        width={Math.min(44, b.w - 20 - k * 44)}
                        height={56}
                        fill={k % 2 === 0 ? '#C8463C' : '#F1E6DA'}
                      />
                    ))}
                    <rect x={10} y={STREET - 190} width={b.w - 20} height={6} fill="#00000033" />
                  </g>
                ) : null}
              </g>
            ))}
          </g>

          {/* Calle */}
          <rect y={STREET} width={WIDTH} height={HEIGHT - STREET} fill={p.street} />
          <rect y={STREET} width={WIDTH} height={14} fill={p.trim} opacity={0.5} />
          {Array.from({length: 8}).map((_, k) => (
            <rect
              key={k}
              x={(k - 1) * 180 - dashShift}
              y={STREET + 70}
              width={90}
              height={10}
              fill="#FFFFFF"
              opacity={0.35}
            />
          ))}
        </g>
      </svg>
      {dim > 0 ? <AbsoluteFill style={{background: '#000', opacity: dim}} /> : null}
    </AbsoluteFill>
  );
};
