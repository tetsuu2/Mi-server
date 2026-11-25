import { BlockId, BlockTiming, TIMINGS } from "../timings";

export type TimedWord = {
  text: string;
  /** Segundos absolutos dentro del video. */
  start: number;
  end: number;
  /** Índice de la palabra dentro de su bloque. */
  index: number;
};

export type SubtitleGroup = {
  words: TimedWord[];
  start: number;
  end: number;
};

export const splitWords = (text: string): string[] =>
  text.split(/\s+/).filter((w) => w.length > 0);

export const getBlock = (id: BlockId): BlockTiming => {
  const block = TIMINGS.find((b) => b.id === id);
  if (!block) {
    throw new Error(`No existe el bloque ${id} en src/timings.ts`);
  }
  return block;
};

/** Palabras de un bloque, repartidas uniformemente entre start y end. */
export const getTimedWords = (block: BlockTiming): TimedWord[] => {
  const words = splitWords(block.text);
  const step = (block.end - block.start) / words.length;
  return words.map((text, index) => ({
    text,
    index,
    start: block.start + index * step,
    end: block.start + (index + 1) * step,
  }));
};

/** Segundo (relativo al inicio del bloque) en que se dice la palabra N. */
export const wordOffset = (id: BlockId, wordIndex: number): number => {
  const block = getBlock(id);
  const words = getTimedWords(block);
  const w = words[Math.min(wordIndex, words.length - 1)];
  return w.start - block.start;
};

/**
 * Agrupa las palabras de un bloque en grupos de 2 a 4 palabras,
 * cortando siempre en los signos de puntuación (. , ? … :).
 */
const groupBlock = (block: BlockTiming): SubtitleGroup[] => {
  const words = getTimedWords(block);

  // 1) Frases separadas por puntuación.
  const phrases: TimedWord[][] = [];
  let current: TimedWord[] = [];
  for (const w of words) {
    current.push(w);
    if (/[.,;:?!…]$/.test(w.text)) {
      phrases.push(current);
      current = [];
    }
  }
  if (current.length > 0) phrases.push(current);

  // 2) Las frases de 1 sola palabra se pegan a la anterior (o la siguiente).
  const merged: TimedWord[][] = [];
  for (const p of phrases) {
    if (p.length === 1 && merged.length > 0) {
      merged[merged.length - 1].push(...p);
    } else {
      merged.push([...p]);
    }
  }
  if (merged.length > 1 && merged[0].length === 1) {
    merged[1].unshift(...merged[0]);
    merged.shift();
  }

  // 3) Cada frase se parte en grupos parejos de hasta 4 palabras.
  const groups: SubtitleGroup[] = [];
  for (const phrase of merged) {
    const count = Math.ceil(phrase.length / 4);
    const base = Math.floor(phrase.length / count);
    let extra = phrase.length % count;
    let i = 0;
    for (let g = 0; g < count; g++) {
      const size = base + (extra > 0 ? 1 : 0);
      if (extra > 0) extra--;
      const slice = phrase.slice(i, i + size);
      i += size;
      groups.push({
        words: slice,
        start: slice[0].start,
        end: slice[slice.length - 1].end,
      });
    }
  }
  return groups;
};

export const getSubtitleGroups = (): SubtitleGroup[] =>
  TIMINGS.flatMap((b) => groupBlock(b));
