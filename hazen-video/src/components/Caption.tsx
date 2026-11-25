import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {pop} from '../anim';
import {BLACK, MONTSERRAT, RED, WHITE} from '../theme';

// Texto estilo TikTok: cada renglón en su propia caja negra, mayúsculas, Montserrat Black.

export type CaptionLine = {words: string[]; sentence: number};

const CHAR_W = 0.76; // ancho medio de una mayúscula en Montserrat Black (em)
const LINE_GAP = 12;
const PAD_X = 0.34; // em
const PAD_Y = 0.13; // em

const normalize = (w: string) =>
  w
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ]/g, '');

const splitSentences = (text: string) =>
  text
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);

const wrap = (sentence: string, maxChars: number) => {
  const words = sentence.split(/\s+/);
  const lines: string[][] = [];
  let cur: string[] = [];
  for (const w of words) {
    const next = [...cur, w].join(' ');
    if (cur.length && next.length > maxChars) {
      lines.push(cur);
      cur = [w];
    } else {
      cur.push(w);
    }
  }
  if (cur.length) lines.push(cur);
  return lines;
};

export const layoutCaption = (
  text: string,
  {maxWidth, maxHeight, maxSize, minSize = 44}: {maxWidth: number; maxHeight: number; maxSize: number; minSize?: number},
) => {
  const sentences = splitSentences(text.toUpperCase());
  for (let size = maxSize; size >= minSize; size -= 2) {
    const maxChars = Math.floor((maxWidth - 2 * PAD_X * size) / (size * CHAR_W));
    const lines: CaptionLine[] = [];
    sentences.forEach((s, si) => wrap(s, maxChars).forEach((words) => lines.push({words, sentence: si})));
    const longest = Math.max(...lines.map((l) => l.words.join(' ').length));
    const lineH = size * 1.08 + 2 * PAD_Y * size;
    const height = lines.length * lineH + (lines.length - 1) * LINE_GAP;
    if (height <= maxHeight && longest <= maxChars) {
      return {lines, size, height};
    }
  }
  const size = minSize;
  const maxChars = Math.floor((maxWidth - 2 * PAD_X * size) / (size * CHAR_W));
  const lines: CaptionLine[] = [];
  sentences.forEach((s, si) => wrap(s, maxChars).forEach((words) => lines.push({words, sentence: si})));
  return {lines, size, height: lines.length * (size * 1.34) + (lines.length - 1) * LINE_GAP};
};

export const CaptionBox: React.FC<{
  children: React.ReactNode;
  size: number;
  appear: number; // 0..1 spring
  rotate?: number;
  bg?: string;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, size, appear, rotate = 0, bg = BLACK, color = WHITE, style}) => {
  const scale = 0.55 + 0.45 * appear;
  return (
    <div
      style={{
        display: 'inline-block',
        background: bg,
        color,
        fontFamily: MONTSERRAT,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1.08,
        letterSpacing: '0.02em',
        padding: `${PAD_Y * size}px ${PAD_X * size}px`,
        borderRadius: Math.max(10, size * 0.16),
        whiteSpace: 'nowrap',
        opacity: Math.min(1, appear * 3),
        transform: `translateY(${(1 - appear) * 40}px) scale(${scale}) rotate(${(1 - appear) * rotate}deg)`,
        boxShadow: '0 10px 0 rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Caption: React.FC<{
  text: string;
  top: number;
  maxWidth?: number;
  maxHeight: number;
  maxSize?: number;
  highlight?: string[];
  highlightColor?: string;
  delays?: (line: CaptionLine, index: number, indexInSentence: number) => number;
  // true = sin animación (para imágenes fijas como el carrusel)
  still?: boolean;
}> = ({text, top, maxWidth = 980, maxHeight, maxSize = 84, highlight = [], highlightColor = RED, delays, still = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {lines, size} = layoutCaption(text, {maxWidth, maxHeight, maxSize});
  const hl = highlight.map(normalize);
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: LINE_GAP,
      }}
    >
      {lines.map((line, i) => {
        const k = lines.slice(0, i).filter((l) => l.sentence === line.sentence).length;
        const d = delays ? delays(line, i, k) : i * 4;
        const a = still ? 1 : pop(frame, fps, d);
        return (
          <CaptionBox key={i} size={size} appear={a} rotate={i % 2 ? 4 : -4}>
            {line.words.map((w, k) => (
              <React.Fragment key={k}>
                {k > 0 ? ' ' : ''}
                <span style={{color: hl.includes(normalize(w)) ? highlightColor : undefined}}>{w}</span>
              </React.Fragment>
            ))}
          </CaptionBox>
        );
      })}
    </div>
  );
};
