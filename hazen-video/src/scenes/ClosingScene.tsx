import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ACCENT, BLACK, SPRING_BOUNCY, WHITE } from "../constants";
import { SceneFrame } from "../components/SceneFrame";

// ─── Escena 5: cierre (B5) ───────────────────────────────────────────────
export const ClosingScene: React.FC<{ duration: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = (delay: number) =>
    spring({ frame: frame - delay, fps, config: SPRING_BOUNCY });
  const q = pop(0);
  const c = pop(6);
  const logo = pop(14);
  const link = pop(22);

  const bounce = Math.abs(Math.sin(frame * 0.22)) * 22;
  const breathe = 1 + 0.04 * Math.sin(frame * 0.16);

  return (
    <SceneFrame style={{ gap: 30 }}>
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: WHITE,
          lineHeight: 1.05,
          letterSpacing: -3,
          textAlign: "center",
          transform: `scale(${interpolate(q, [0, 1], [1.3, 1])})`,
          opacity: frame === 0 ? 0 : 1,
        }}
      >
        ¿Tu profesión necesita <span style={{ color: ACCENT }}>página</span>?
      </div>

      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: WHITE,
          display: "flex",
          alignItems: "center",
          gap: 18,
          transform: `scale(${c})`,
        }}
      >
        Comentá cuál
        <span style={{ display: "inline-block", transform: `translateY(${bounce}px)` }}>
          👇
        </span>
      </div>

      <div
        style={{
          marginTop: 70,
          fontSize: 190,
          fontWeight: 900,
          color: ACCENT,
          letterSpacing: 6,
          lineHeight: 1,
          transform: `scale(${logo * breathe})`,
        }}
      >
        HAZEN
      </div>

      <div
        style={{
          padding: "20px 44px",
          borderRadius: 60,
          backgroundColor: WHITE,
          color: BLACK,
          fontSize: 48,
          fontWeight: 900,
          transform: `scale(${link})`,
        }}
      >
        Link en el perfil
      </div>
    </SceneFrame>
  );
};
