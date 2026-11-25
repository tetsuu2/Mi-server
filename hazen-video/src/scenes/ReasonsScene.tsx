import React from "react";
import {
  interpolate,
  interpolateColors,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ACCENT,
  BLACK,
  GRAY,
  SPRING_BOUNCY,
  SPRING_SNAPPY,
  WHITE,
} from "../constants";
import { SceneFrame } from "../components/SceneFrame";

// ─── Escena 2: tres razones (B2 dividido en 3 partes iguales) ─────────────
export const ReasonsScene: React.FC<{ duration: number }> = ({ duration }) => {
  const part = Math.floor(duration / 3);
  const parts = [
    { n: 1, title: "Nadie te encuentra en Google", Visual: SearchVisual },
    { n: 2, title: "No transmite seriedad", Visual: CheckToCrossVisual },
    { n: 3, title: "El cliente no sabe cómo contactarte", Visual: LostCursorVisual },
  ];
  return (
    <>
      {parts.map((p, i) => {
        const len = i === 2 ? duration - part * 2 : part;
        return (
          <Sequence
            key={p.n}
            from={part * i}
            durationInFrames={len}
            name={`Razón ${p.n}`}
          >
            <SceneFrame style={{ justifyContent: "flex-start" }}>
              <ReasonTitle n={p.n} title={p.title} />
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p.Visual duration={len} />
              </div>
            </SceneFrame>
          </Sequence>
        );
      })}
    </>
  );
};

const ReasonTitle: React.FC<{ n: number; title: string }> = ({ n, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: SPRING_BOUNCY });
  return (
    <div
      style={{
        marginTop: 30,
        textAlign: "center",
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
        opacity: frame === 0 ? 0 : 1,
        fontWeight: 900,
        color: WHITE,
        fontSize: 82,
        lineHeight: 1.08,
        letterSpacing: -2,
      }}
    >
      <span style={{ color: ACCENT, fontSize: 120 }}>{n}</span>
      <span style={{ color: ACCENT }}> · </span>
      {title}
    </div>
  );
};

// ─── 1 · Barra de búsqueda genérica (sin logos) ──────────────────────────
const QUERY = "abogado en Resistencia";

const SearchVisual: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typeStart = 6;
  const typeEnd = typeStart + Math.min(34, Math.floor(duration * 0.4));
  const chars = Math.round(
    interpolate(frame, [typeStart, typeEnd], [0, QUERY.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typing = frame < typeEnd + 4;
  const caretOn = typing || Math.floor(frame / 8) % 2 === 0;

  const barIn = spring({ frame, fps, config: SPRING_BOUNCY });
  const resultsStart = typeEnd + 4;
  const labelStart = resultsStart + 20;
  const label = spring({ frame: frame - labelStart, fps, config: SPRING_BOUNCY });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 28,
      }}
    >
      {/* Barra */}
      <div
        style={{
          width: "100%",
          height: 130,
          borderRadius: 65,
          backgroundColor: WHITE,
          display: "flex",
          alignItems: "center",
          padding: "0 44px",
          gap: 30,
          transform: `scale(${interpolate(barIn, [0, 1], [0.7, 1])})`,
          boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
        }}
      >
        <MagnifierIcon />
        <div
          style={{
            fontSize: 52,
            fontWeight: 600,
            color: "#202020",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
          }}
        >
          {QUERY.slice(0, chars)}
          <div
            style={{
              width: 5,
              height: 60,
              marginLeft: 4,
              backgroundColor: "#202020",
              opacity: caretOn ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Resultados genéricos: ninguno sos vos */}
      {[0, 1, 2].map((i) => {
        const s = spring({
          frame: frame - resultsStart - i * 5,
          fps,
          config: SPRING_SNAPPY,
        });
        return (
          <div
            key={i}
            style={{
              width: "100%",
              height: 118,
              borderRadius: 26,
              backgroundColor: "#1C1C1C",
              padding: "24px 34px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 16,
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
            }}
          >
            <div
              style={{
                width: [430, 520, 380][i],
                height: 22,
                borderRadius: 11,
                backgroundColor: "#5A5A5A",
              }}
            />
            <div
              style={{
                width: [700, 610, 660][i],
                height: 16,
                borderRadius: 8,
                backgroundColor: "#333",
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          marginTop: 6,
          fontSize: 54,
          fontWeight: 900,
          color: WHITE,
          opacity: frame < labelStart ? 0 : 1,
          transform: `scale(${interpolate(label, [0, 1], [1.4, 1])})`,
          textAlign: "center",
        }}
      >
        Tu Instagram <span style={{ color: ACCENT }}>no aparece</span>.
      </div>
    </div>
  );
};

const MagnifierIcon: React.FC = () => (
  <div style={{ position: "relative", width: 54, height: 54, flexShrink: 0 }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        border: `7px solid ${GRAY}`,
        boxSizing: "border-box",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 33,
        top: 30,
        width: 22,
        height: 8,
        borderRadius: 4,
        backgroundColor: GRAY,
        transform: "rotate(45deg)",
        transformOrigin: "left center",
      }}
    />
  </div>
);

// ─── 2 · Un check que se transforma en cruz ──────────────────────────────
type Pt = [number, number];
const lerpPt = (a: Pt, b: Pt, t: number): Pt => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
// Coordenadas en un viewBox de -100..100
const CHECK: [Pt, Pt, Pt, Pt] = [
  [-48, 2],
  [-14, 36],
  [-14, 36],
  [50, -34],
];
const CROSS: [Pt, Pt, Pt, Pt] = [
  [-40, -40],
  [40, 40],
  [-40, 40],
  [40, -40],
];

const CheckToCrossVisual: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: SPRING_BOUNCY });
  const draw = interpolate(frame, [4, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const morphStart = Math.floor(duration * 0.38);
  const morph = spring({
    frame: frame - morphStart,
    fps,
    config: SPRING_BOUNCY,
  });
  const m = Math.min(1, Math.max(0, morph));
  const color = interpolateColors(m, [0, 1], [ACCENT, WHITE]);

  // Sacudón cuando se convierte en cruz
  const since = frame - morphStart;
  const amp = since >= 0 ? 16 * Math.max(0, 1 - since / 12) : 0;
  const shake = Math.sin(frame * 2.9) * amp;

  const p = CHECK.map((c, i) => lerpPt(c, CROSS[i], morph)) as Pt[];
  const len1 = Math.hypot(p[1][0] - p[0][0], p[1][1] - p[0][1]);
  const len2 = Math.hypot(p[3][0] - p[2][0], p[3][1] - p[2][1]);
  // El check se "dibuja": primero el trazo corto, después el largo.
  const d1 = Math.min(1, draw * 2);
  const d2 = Math.max(0, draw * 2 - 1);

  return (
    <div
      style={{
        transform: `translateX(${shake}px) scale(${interpolate(enter, [0, 1], [0.5, 1])})`,
      }}
    >
      <svg width={560} height={560} viewBox="-100 -100 200 200">
        <circle
          cx={0}
          cy={0}
          r={86}
          fill="none"
          stroke={color}
          strokeWidth={9}
        />
        <line
          x1={p[0][0]}
          y1={p[0][1]}
          x2={p[1][0]}
          y2={p[1][1]}
          stroke={color}
          strokeWidth={17}
          strokeLinecap="round"
          strokeDasharray={len1}
          strokeDashoffset={len1 * (1 - d1)}
        />
        <line
          x1={p[2][0]}
          y1={p[2][1]}
          x2={p[3][0]}
          y2={p[3][1]}
          stroke={color}
          strokeWidth={17}
          strokeLinecap="round"
          strokeDasharray={len2}
          strokeDashoffset={len2 * (1 - d2)}
        />
      </svg>
    </div>
  );
};

// ─── 3 · Un cursor perdido dando vueltas ─────────────────────────────────
const QUESTIONS = [
  { text: "¿WhatsApp?", x: -250, y: -230, at: 4 },
  { text: "¿Teléfono?", x: 220, y: -60, at: 12 },
  { text: "¿Mail?", x: -210, y: 170, at: 20 },
  { text: "¿Dirección?", x: 190, y: 260, at: 28 },
];

const LostCursorVisual: React.FC<{ duration: number }> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame;
  const x = Math.sin(t * 0.11) * 250 + Math.sin(t * 0.31) * 70;
  const y = Math.sin(t * 0.17 + 1.2) * 220 + Math.cos(t * 0.27) * 60;
  const rot = Math.sin(t * 0.21) * 28 - 12;

  return (
    <div style={{ position: "relative", width: 920, height: 720 }}>
      {QUESTIONS.map((q) => {
        const s = spring({ frame: frame - q.at, fps, config: SPRING_BOUNCY });
        const wobble = Math.sin((frame + q.at * 3) * 0.15) * 4;
        return (
          <div
            key={q.text}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) translate(${q.x}px, ${q.y}px) rotate(${wobble}deg) scale(${s})`,
              padding: "18px 34px",
              borderRadius: 40,
              border: `4px dashed ${GRAY}`,
              color: "#BDBDBD",
              fontSize: 46,
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            {q.text}
          </div>
        );
      })}

      {/* Signos de pregunta que siguen al cursor */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(${x + 60}px, ${y - 120}px) scale(${1 + Math.sin(frame * 0.4) * 0.12})`,
          color: ACCENT,
          fontSize: 110,
          fontWeight: 900,
        }}
      >
        ?
      </div>

      <svg
        width={120}
        height={150}
        viewBox="0 0 24 30"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
          transformOrigin: "0 0",
          filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.6))",
        }}
      >
        <path
          d="M1 1 L1 23 L7 17.5 L11 27 L15 25.3 L11 16 L19 16 Z"
          fill={WHITE}
          stroke={BLACK}
          strokeWidth={1.6}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
