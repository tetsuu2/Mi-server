import React from "react";
import {
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ACCENT, BLACK, SPRING_BOUNCY, WHITE } from "../constants";
import { SceneFrame } from "../components/SceneFrame";
import { wordOffset } from "../lib/words";

const PRICE = 120000;

/** 120000 → "120.000" (formato argentino, sin depender del navegador). */
const formatARS = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// ─── Escena 4: oferta (B4) ───────────────────────────────────────────────
export const OfferScene: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Conteo hasta $120.000
  const countEnd = Math.min(Math.floor(duration * 0.3), 36);
  const value = interpolate(frame, [0, countEnd], [0, PRICE], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const landed = spring({ frame: frame - countEnd, fps, config: SPRING_BOUNCY });
  const priceScale =
    frame < countEnd ? 0.9 + 0.1 * (frame / countEnd) : 1 + 0.12 * Math.sin(Math.min(1, landed) * Math.PI);

  const enter = spring({ frame, fps, config: SPRING_BOUNCY });

  // Las mitades aparecen cuando la voz dice "Pagás la mitad…" y "…la otra mitad".
  const firstHalfAt = Math.round(wordOffset("B4", 6) * fps);
  const secondHalfAt = Math.round(wordOffset("B4", 11) * fps);

  return (
    <SceneFrame>
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: WHITE,
          letterSpacing: -1,
          transform: `scale(${interpolate(enter, [0, 1], [0.6, 1])})`,
        }}
      >
        Todo por
      </div>

      <div
        style={{
          fontSize: 210,
          fontWeight: 900,
          color: ACCENT,
          letterSpacing: -8,
          lineHeight: 1.05,
          fontVariantNumeric: "tabular-nums",
          transform: `scale(${priceScale})`,
          marginBottom: 60,
        }}
      >
        ${formatARS(value)}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          width: "100%",
        }}
      >
        <HalfCard at={firstHalfAt} label="para arrancar" />
        <div
          style={{
            fontSize: 70,
            fontWeight: 900,
            color: ACCENT,
            opacity: frame >= secondHalfAt ? 1 : 0.25,
          }}
        >
          ·
        </div>
        <HalfCard at={secondHalfAt} label="al terminar" />
      </div>
    </SceneFrame>
  );
};

const HalfCard: React.FC<{ at: number; label: string }> = ({ at, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: SPRING_BOUNCY });
  const visible = frame >= at;
  return (
    <div
      style={{
        flex: 1,
        height: 250,
        borderRadius: 36,
        backgroundColor: visible ? ACCENT : "transparent",
        border: `5px solid ${visible ? ACCENT : "#2A2A2A"}`,
        color: BLACK,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${visible ? interpolate(s, [0, 1], [0.6, 1]) : 1})`,
      }}
    >
      <div
        style={{
          fontSize: 104,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: -3,
          color: visible ? BLACK : "#2A2A2A",
        }}
      >
        50%
      </div>
      <div
        style={{
          fontSize: 40,
          fontWeight: 800,
          marginTop: 10,
          color: visible ? BLACK : "#2A2A2A",
        }}
      >
        {label}
      </div>
    </div>
  );
};
