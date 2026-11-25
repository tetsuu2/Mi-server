import {interpolate, spring, Easing} from 'remotion';

// Spring rápido con rebote (look TikTok).
export const pop = (frame: number, fps: number, delay = 0) =>
  spring({frame: frame - delay, fps, config: {damping: 9, stiffness: 210, mass: 0.6}});

// Spring rápido sin tanto rebote, para entradas desde abajo.
export const rise = (frame: number, fps: number, delay = 0) =>
  spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 190, mass: 0.7}});

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const ramp = (frame: number, start: number, end: number, ease = Easing.out(Easing.cubic)) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

// Temblor determinístico.
export const shake = (frame: number, amount: number, speed = 1.7) => ({
  x: Math.sin(frame * speed * 2.3) * amount,
  y: Math.cos(frame * speed * 3.1) * amount * 0.6,
});

// Separador de miles estilo AR: 120000 -> "120.000"
export const formatAR = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
