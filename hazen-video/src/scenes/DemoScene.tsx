import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ACCENT,
  BLACK,
  GRAY,
  SPRING_BOUNCY,
  WHITE,
} from "../constants";
import { SceneFrame } from "../components/SceneFrame";
import { Phone, SCREEN_HEIGHT } from "../components/Phone";

const FLASH_FRAMES = 3;

// ─── Escena 3: demo (B3) ─────────────────────────────────────────────────
export const DemoScene: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const half = Math.floor(duration / 2);

  const phoneIn = spring({
    frame: frame - FLASH_FRAMES,
    fps,
    config: SPRING_BOUNCY,
  });

  // Contador 0 → 72 h, termina cuando la landing ya está armada.
  const hours = Math.round(
    interpolate(frame, [FLASH_FRAMES, Math.floor(duration * 0.8)], [0, 72], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
  const counterDone = hours === 72;

  return (
    <AbsoluteFill>
      <SceneFrame style={{ justifyContent: "flex-start" }}>
        {/* Título + contador */}
        <div
          style={{
            textAlign: "center",
            color: WHITE,
            fontWeight: 900,
            marginTop: -10,
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 50, lineHeight: 1.05, letterSpacing: -1 }}>
            Del formulario a tu página en
          </div>
          <div
            style={{
              fontSize: 118,
              lineHeight: 1,
              color: ACCENT,
              letterSpacing: -3,
              fontVariantNumeric: "tabular-nums",
              transform: `scale(${counterDone ? 1 + 0.06 * Math.max(0, Math.sin((frame - Math.floor(duration * 0.8)) * 0.35)) : 1})`,
            }}
          >
            {hours} hs
          </div>
        </div>

        <Phone
          style={{
            transform: `translateY(${interpolate(phoneIn, [0, 1], [400, 0])}px) scale(0.98)`,
          }}
        >
          {frame < half ? (
            <FormScreen duration={half} />
          ) : (
            <LandingScreen frame={frame - half} duration={duration - half} />
          )}
        </Phone>
      </SceneFrame>

      {/* Flash blanco de 3 frames */}
      {frame < FLASH_FRAMES ? (
        <AbsoluteFill style={{ backgroundColor: WHITE }} />
      ) : null}
    </AbsoluteFill>
  );
};

// ─── Primera mitad: formulario que se completa solo ─────────────────────
const FIELDS = [
  { label: "Nombre", value: "Estudio Gómez & Asociados" },
  { label: "Profesión", value: "Abogados" },
  { label: "Servicios", value: "Laboral, Familia, Sucesiones" },
  { label: "WhatsApp", value: "362 455 1234" },
];

export const FormScreen: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const typeStart = FLASH_FRAMES + 8;
  const typeEnd = Math.floor(duration * 0.7);
  const totalChars = FIELDS.reduce((a, f) => a + f.value.length, 0);
  const typed = Math.floor(
    interpolate(frame, [typeStart, typeEnd], [0, totalChars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const pressAt = typeEnd + 3;
  const pressed = frame >= pressAt;
  const press = spring({ frame: frame - pressAt, fps, config: SPRING_BOUNCY });
  // Se hunde y vuelve con rebote
  const btnScale = pressed ? interpolate(press, [0, 0.5, 1], [1, 0.88, 1]) : 1;
  const ripple = interpolate(frame - pressAt, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // El formulario desaparece en los últimos frames de la primera mitad.
  const exit = interpolate(frame, [duration - 5, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Campo con foco = el primero que todavía no está completo.
  let offset = 0;
  const fields = FIELDS.map((f) => {
    const shown = Math.max(0, Math.min(f.value.length, typed - offset));
    offset += f.value.length;
    return { ...f, shown, complete: shown === f.value.length };
  });
  const focusIndex = fields.findIndex((f) => !f.complete);

  return (
    <div
      style={{
        padding: "78px 30px 30px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        opacity: 1 - exit,
        transform: `scale(${1 - exit * 0.15})`,
      }}
    >
      <div>
        <div style={{ fontSize: 34, fontWeight: 900, color: BLACK }}>
          Creá tu página
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: GRAY, marginTop: 4 }}>
          Te lleva 5 minutos
        </div>
      </div>

      {fields.map((f, i) => {
        const { shown } = f;
        const focused = i === focusIndex;
        return (
          <div key={f.label}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#6B6B6B",
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 7,
              }}
            >
              {f.label}
            </div>
            <div
              style={{
                height: 62,
                borderRadius: 14,
                border: `3px solid ${focused ? ACCENT : "#DDDDDA"}`,
                backgroundColor: WHITE,
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                fontSize: 21,
                fontWeight: 600,
                color: "#1A1A1A",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {f.value.slice(0, shown)}
              {focused ? (
                <div
                  style={{
                    width: 3,
                    height: 28,
                    marginLeft: 2,
                    backgroundColor: "#1A1A1A",
                  }}
                />
              ) : null}
            </div>
          </div>
        );
      })}

      <div
        style={{
          marginTop: 14,
          height: 78,
          borderRadius: 39,
          backgroundColor: pressed ? ACCENT : BLACK,
          color: pressed ? BLACK : WHITE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
          fontWeight: 900,
          transform: `scale(${btnScale})`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {pressed ? "¡Enviado! ✓" : "Enviar"}
        {pressed && ripple < 1 ? (
          <div
            style={{
              position: "absolute",
              width: 420,
              height: 420,
              borderRadius: 210,
              backgroundColor: WHITE,
              opacity: 0.5 * (1 - ripple),
              transform: `scale(${ripple})`,
            }}
          />
        ) : null}
      </div>

      {/* Dedo / tap */}
      {frame >= pressAt - 6 && frame < pressAt + 8 ? (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 70,
            width: 70,
            height: 70,
            marginLeft: -35,
            borderRadius: 35,
            backgroundColor: "rgba(0,0,0,0.25)",
            border: "4px solid rgba(255,255,255,0.9)",
            transform: `scale(${frame < pressAt ? 1.3 : 0.85})`,
          }}
        />
      ) : null}
    </div>
  );
};

// ─── Segunda mitad: landing que se arma bloque por bloque ───────────────
const SERVICES = [
  { title: "Laboral", desc: "Despidos e indemnizaciones" },
  { title: "Familia", desc: "Divorcios y alimentos" },
  { title: "Sucesiones", desc: "Herencias sin vueltas" },
];
const HEADER_H = 112;
const HERO_H = 300;
const SERVICES_H = 384;
const CTA_H = 132;
const FOOTER_H = 150;
const CONTENT_H = HEADER_H + HERO_H + SERVICES_H + CTA_H + FOOTER_H;

export const LandingScreen: React.FC<{
  frame: number;
  duration: number;
  /** true = landing completa y quieta, sin scroll (para imágenes fijas). */
  still?: boolean;
}> = ({ frame, duration, still = false }) => {
  const { fps } = useVideoConfig();

  // Cada bloque entra con spring desde abajo, escalonado.
  const step = Math.max(4, Math.floor(duration * 0.07));
  const enter = (i: number): React.CSSProperties => {
    if (still) return { position: "relative", zIndex: 20 - Math.round(i * 2) };
    const s = spring({ frame: frame - i * step, fps, config: SPRING_BOUNCY });
    return {
      opacity: frame < i * step ? 0 : 1,
      transform: `translateY(${interpolate(s, [0, 1], [140, 0])}px)`,
      // Los bloques de arriba quedan por encima cuando el de abajo rebota.
      position: "relative",
      zIndex: 20 - Math.round(i * 2),
    };
  };

  const scrollStart = Math.max(7 * step + 8, Math.floor(duration * 0.62));
  const scroll = still ? 0 : interpolate(
    frame,
    [scrollStart, duration - 3],
    [0, CONTENT_H - SCREEN_HEIGHT],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    },
  );

  const ctaFrame = frame - 5 * step;
  const pulse = !still && ctaFrame > 8 ? 1 + 0.05 * Math.max(0, Math.sin(ctaFrame * 0.32)) : 1;
  const ring = still ? 0.35 : ctaFrame > 8 ? ((ctaFrame - 8) % 20) / 20 : 0;

  return (
    <div
      style={{
        height: CONTENT_H,
        transform: `translateY(${-scroll}px)`,
        backgroundColor: "#F7F7F5",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: HEADER_H,
          padding: "54px 24px 0",
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: WHITE,
          borderBottom: "2px solid #ECECEA",
          boxSizing: "border-box",
          ...enter(0),
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            backgroundColor: ACCENT,
            color: BLACK,
            fontWeight: 900,
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          G
        </div>
        <div style={{ fontSize: 17, fontWeight: 900, color: BLACK, flex: 1 }}>
          Estudio Gómez & Asociados
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 24, height: 3.5, borderRadius: 2, backgroundColor: BLACK }} />
          ))}
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          height: HERO_H,
          backgroundColor: BLACK,
          padding: "34px 28px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          ...enter(1),
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, color: ACCENT, letterSpacing: 2 }}>
          ABOGADOS · RESISTENCIA
        </div>
        <div style={{ fontSize: 37, fontWeight: 900, color: WHITE, lineHeight: 1.08, letterSpacing: -0.5 }}>
          Asesoramiento legal claro y cercano
        </div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#A8A8A8" }}>
          Te explicamos todo, sin vueltas.
        </div>
      </div>

      {/* Servicios */}
      <div
        style={{
          height: SERVICES_H,
          padding: "26px 22px 0",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 900, color: BLACK, ...enter(2) }}>
          Servicios
        </div>
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            style={{
              height: 92,
              borderRadius: 18,
              backgroundColor: WHITE,
              border: "2px solid #E6E6E3",
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 18px",
              boxSizing: "border-box",
              ...enter(2 + i * 0.7),
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 14,
                backgroundColor: `${ACCENT}33`,
                border: `3px solid ${ACCENT}`,
                boxSizing: "border-box",
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 21, fontWeight: 900, color: BLACK }}>{s.title}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: GRAY, marginTop: 2 }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA WhatsApp */}
      <div
        style={{
          height: CTA_H,
          padding: "0 22px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          ...enter(5),
        }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 44,
              border: `4px solid ${ACCENT}`,
              opacity: 1 - ring,
              transform: `scale(${1 + ring * 0.18})`,
            }}
          />
          <div
            style={{
              height: 88,
              borderRadius: 44,
              backgroundColor: ACCENT,
              color: BLACK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 23,
              fontWeight: 900,
              transform: `scale(${pulse})`,
              boxShadow: `0 12px 30px ${ACCENT}66`,
            }}
          >
            Consultar por WhatsApp
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          height: FOOTER_H,
          backgroundColor: BLACK,
          padding: "26px 26px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          ...enter(6),
        }}
      >
        <div style={{ fontSize: 17, fontWeight: 900, color: WHITE }}>
          Estudio Gómez & Asociados
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#A8A8A8" }}>
          Av. 9 de Julio 1234 · Resistencia, Chaco
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#A8A8A8" }}>
          Lunes a viernes · 8 a 18 h
        </div>
      </div>
    </div>
  );
};
