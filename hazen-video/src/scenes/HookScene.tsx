import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, SIDE_PADDING, SPRING_BOUNCY, WHITE, WIDTH } from "../constants";
import { SceneFrame } from "../components/SceneFrame";
import { splitWords } from "../lib/words";

/** "NO", "HOY", "GRATIS"... → palabras enteras en mayúsculas = énfasis. */
const isEmphasis = (word: string) => {
  const letters = word.replace(/[^\p{L}]/gu, "");
  return letters.length >= 2 && letters === letters.toUpperCase();
};

/** Tamaño de letra según largo total y palabra más larga (para que no desborde). */
const fitFontSize = (words: string[]) => {
  const available = WIDTH - SIDE_PADDING * 2 - 20;
  const chars = words.join(" ").length;
  const longest = Math.max(
    ...words.map((w) => w.length * (isEmphasis(w) ? 1.35 : 1)),
  );
  const byLength = 150 - Math.max(0, chars - 36) * 1.1;
  const byLongestWord = available / (longest * 0.76);
  return Math.round(Math.max(84, Math.min(140, byLength, byLongestWord)));
};

export const HookScene: React.FC<{ hookText: string; duration: number }> = ({
  hookText,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = splitWords(hookText);
  const fontSize = fitFontSize(words);

  // Todas las palabras entran en el primer ~55% de la escena (3 a 6 frames c/u).
  const delay = Math.max(
    3,
    Math.min(6, Math.floor((duration * 0.55) / words.length)),
  );

  // Shake leve cada vez que entra una palabra.
  const lastIndex = Math.min(words.length - 1, Math.floor(frame / delay));
  const sinceLast = frame - lastIndex * delay;
  const amp = 9 * Math.max(0, 1 - sinceLast / 7);
  const shakeX = Math.sin(frame * 2.7) * amp;
  const shakeY = Math.cos(frame * 3.3) * amp * 0.6;
  const shakeR = Math.sin(frame * 1.9) * amp * 0.08;

  return (
    <SceneFrame>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "baseline",
          columnGap: fontSize * 0.26,
          rowGap: fontSize * 0.02,
          transform: `translate(${shakeX}px, ${shakeY}px) rotate(${shakeR}deg)`,
          fontWeight: 900,
          fontSize,
          lineHeight: 1.08,
          letterSpacing: -2,
          textAlign: "center",
        }}
      >
        {words.map((word, i) => {
          const start = i * delay;
          if (frame < start) {
            // Reserva el lugar para que el texto no "salte" al entrar palabras.
            return (
              <span key={i} style={{ visibility: "hidden", ...wordStyle(word) }}>
                {word}
              </span>
            );
          }
          const s = spring({
            frame: frame - start,
            fps,
            config: SPRING_BOUNCY,
          });
          const scale = 1.3 - 0.3 * s;
          return (
            <span
              key={i}
              style={{
                ...wordStyle(word),
                display: "inline-block",
                transform: `scale(${scale})`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </SceneFrame>
  );
};

const wordStyle = (word: string): React.CSSProperties =>
  isEmphasis(word)
    ? { color: ACCENT, fontSize: "1.35em", lineHeight: 1 }
    : { color: WHITE };
