import {loadFont as loadMontserrat} from '@remotion/google-fonts/Montserrat';
import {loadFont as loadSilkscreen} from '@remotion/google-fonts/Silkscreen';

// Cambiá este color por el de tu marca.
export const ACCENT = '#00E07A';

export const BLACK = '#0A0A0A';
export const WHITE = '#FFFFFF';
export const RED = '#FF3B30';

export const SAFE_TOP = 250;
export const SAFE_BOTTOM = 350;

export const {fontFamily: MONTSERRAT} = loadMontserrat('normal', {
  weights: ['600', '700', '800', '900'],
  subsets: ['latin'],
});

// Tipografía pixel para carteles y detalles del mundo 8-bit.
export const {fontFamily: PIXEL} = loadSilkscreen('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

// Devuelve negro o blanco según cuál se lea mejor sobre `hex`.
export const readableOn = (hex: string) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? BLACK : WHITE;
};

// Sombra dura "pixel" (sin blur), como en los juegos 8-bit.
export const hardShadow = (d = 6, color = BLACK) => `${d}px ${d}px 0 ${color}`;
