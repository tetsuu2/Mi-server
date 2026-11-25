/**
 * TIEMPOS DE LA VOZ EN OFF (en segundos)
 * ======================================
 * Cada bloque del guion tiene un `start` y un `end` = cuándo empieza y
 * termina de hablar la voz en ese bloque. Editá los números a mano para
 * ajustar la sincronización.
 *
 * - Cada escena arranca en el `start` de su bloque y dura hasta el `start`
 *   del bloque siguiente (corte duro). La primera escena arranca en 0 y la
 *   última dura hasta el final del audio.
 * - Los subtítulos se muestran solo entre `start` y `end`; las palabras se
 *   reparten uniformemente dentro de ese rango.
 *
 * Hay dos juegos de tiempos para public/voz.mp3 (29,68 s):
 *
 * 1) PROPORTIONAL_TIMINGS: el audio repartido en forma proporcional a la
 *    cantidad de palabras de cada bloque (83 palabras en total).
 *    Se regenera con:  npm run timings
 *
 * 2) MEASURED_TIMINGS: los mismos bloques ajustados a las pausas reales de
 *    la voz (detectadas con el filtro silencedetect de ffmpeg). Es el
 *    "ajuste a mano" ya hecho: lo proporcional queda corrido hasta ~1,4 s
 *    en los bloques 3 a 5 porque la locutora hace pausas largas entre
 *    bloques.
 *
 * TIMINGS (abajo de todo) define cuál se usa. Si cambiás la voz, corré
 * `npm run timings`, pegá el resultado en PROPORTIONAL_TIMINGS y apuntá
 * TIMINGS a ese array.
 */

export type BlockId = "B1" | "B2" | "B3" | "B4" | "B5";

export type BlockTiming = {
  id: BlockId;
  /** Texto exacto de la voz en off (se usa para los subtítulos). */
  text: string;
  /** Segundo en que empieza a hablar la voz en este bloque. */
  start: number;
  /** Segundo en que termina de hablar la voz en este bloque. */
  end: number;
};

const TEXT: Record<BlockId, string> = {
  B1: "Si sos profesional y solo tenés Instagram... esto te va a doler.",
  B2: "Google no muestra tu Instagram. Un cliente que va a pagar quiere ver algo serio. Y si tiene que buscar cómo escribirte... se va.",
  B3: "Con Hazen completás un formulario de cinco minutos, y en setenta y dos horas tenés tu página online.",
  B4: "Todo por ciento veinte mil pesos. Pagás la mitad para arrancar, y la otra mitad cuando la ves terminada.",
  B5: "¿Vos tenés página, o solo Instagram? Contame en los comentarios.",
};

// Proporcional a la cantidad de palabras (12 / 24 / 18 / 19 / 10).
export const PROPORTIONAL_TIMINGS: BlockTiming[] = [
  { id: "B1", text: TEXT.B1, start: 0.0, end: 4.29 },
  { id: "B2", text: TEXT.B2, start: 4.29, end: 12.871 },
  { id: "B3", text: TEXT.B3, start: 12.871, end: 19.307 },
  { id: "B4", text: TEXT.B4, start: 19.307, end: 26.1 },
  { id: "B5", text: TEXT.B5, start: 26.1, end: 29.675 },
];

// Ajustado a las pausas reales de public/voz.mp3.
export const MEASURED_TIMINGS: BlockTiming[] = [
  { id: "B1", text: TEXT.B1, start: 0.0, end: 3.55 },
  { id: "B2", text: TEXT.B2, start: 3.65, end: 11.45 },
  { id: "B3", text: TEXT.B3, start: 12.1, end: 17.5 },
  { id: "B4", text: TEXT.B4, start: 18.25, end: 24.55 },
  { id: "B5", text: TEXT.B5, start: 25.7, end: 29.35 },
];

/** ← El array que usa el video. */
export const TIMINGS: BlockTiming[] = MEASURED_TIMINGS;
