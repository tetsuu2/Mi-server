// Todos los tiempos están en SEGUNDOS. Editalos libremente.
// Los valores por defecto coinciden con las pausas de la locución
// (ElevenLabs, 27,2 s) detectadas automáticamente.

export const FPS = 30;
export const DURATION_SECONDS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const TIMINGS = {
  B1: {start: 0, end: 4}, // Gancho
  B2: {start: 4, end: 12}, // No existís
  B3: {start: 12, end: 21}, // Solución
  B4: {start: 21, end: 27}, // Oferta
  B5: {start: 27, end: 30}, // Cierre
} as const;

// Momentos internos de cada bloque (segundos absolutos del video).
export const BEATS = {
  // B1: aparece la segunda frase del gancho ("Y eligió a otro.") + toque en el 1er resultado
  hookSecondSentence: 2.95,
  // B2: corte de "Sin página..." a "Con Instagram solo..."
  b2Split: 7.25,
  // B3: después del logo HAZEN entra el celular con la landing
  b3Phone: 13.4,
  b3Services: 16.0,
  b3Button: 17.8,
  b3Map: 19.9,
  // B4
  b4Split: 23.6, // "50% para arrancar · 50% al terminar"
  b4Check: 25.9, // check que se dibuja
} as const;

export const sec = (s: number) => Math.round(s * FPS);

export type BlockName = keyof typeof TIMINGS;

export const block = (name: BlockName) => {
  const b = TIMINGS[name];
  return {from: sec(b.start), durationInFrames: sec(b.end) - sec(b.start)};
};

// Convierte un beat absoluto en un frame relativo al inicio de un bloque.
export const beatIn = (name: BlockName, seconds: number) =>
  sec(seconds) - sec(TIMINGS[name].start);
