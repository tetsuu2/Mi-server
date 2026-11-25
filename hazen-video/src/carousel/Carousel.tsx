import React from "react";
import { AbsoluteFill, Freeze } from "remotion";
import { ACCENT, BLACK, GRAY, WHITE } from "../constants";
import { MONTSERRAT } from "../fonts";
import { Phone } from "../components/Phone";
import {
  CheckToCrossVisual,
  LostCursorVisual,
  SearchVisual,
} from "../scenes/ReasonsScene";
import { FormScreen, LandingScreen } from "../scenes/DemoScene";
import { HalfCard, formatARS } from "../scenes/OfferScene";
import { isEmphasis } from "../scenes/HookScene";

// ─── Formato del carrusel ────────────────────────────────────────────────
// 1080×1350 (4:5) es el formato de anuncios en feed de Instagram/Facebook
// y también funciona en el modo foto de TikTok.
export const CAROUSEL_WIDTH = 1080;
export const CAROUSEL_HEIGHT = 1350;
const PAD = 80;

export const CAROUSEL_HOOK =
  "Abogado, contador, médico: tu Instagram NO es tu página web.";

// ─── Marco común: marca arriba, puntitos de progreso + "Deslizá" abajo ──
const SlideFrame: React.FC<{
  index: number;
  total: number;
  children: React.ReactNode;
  showSwipe?: boolean;
}> = ({ index, total, children, showSwipe = true }) => (
  <AbsoluteFill
    style={{
      backgroundColor: BLACK,
      fontFamily: MONTSERRAT,
      color: WHITE,
      padding: `64px ${PAD}px 60px`,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 900, color: ACCENT, letterSpacing: 3 }}>
        HAZEN
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: GRAY }}>
        {index}/{total}
      </div>
    </div>

    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
      }}
    >
      {children}
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i + 1 === index ? 44 : 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: i + 1 === index ? ACCENT : "#3A3A3A",
            }}
          />
        ))}
      </div>
      {showSwipe ? (
        <div style={{ fontSize: 34, fontWeight: 900, color: ACCENT }}>
          Deslizá →
        </div>
      ) : null}
    </div>
  </AbsoluteFill>
);

const Title: React.FC<{ n?: number; children: React.ReactNode; size?: number }> = ({
  n,
  children,
  size = 78,
}) => (
  <div
    style={{
      textAlign: "center",
      fontWeight: 900,
      fontSize: size,
      lineHeight: 1.06,
      letterSpacing: -2,
      marginBottom: 40,
    }}
  >
    {n !== undefined ? (
      <>
        <span style={{ color: ACCENT, fontSize: size * 1.45 }}>{n}</span>
        <span style={{ color: ACCENT }}> · </span>
      </>
    ) : null}
    {children}
  </div>
);

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 36,
      fontSize: 44,
      fontWeight: 800,
      color: "#CFCFCF",
      textAlign: "center",
      lineHeight: 1.2,
    }}
  >
    {children}
  </div>
);

// ─── Slides ──────────────────────────────────────────────────────────────
const HookSlide: React.FC<{ hookText: string }> = ({ hookText }) => {
  const words = hookText.split(/\s+/).filter(Boolean);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "baseline",
        columnGap: 30,
        fontWeight: 900,
        fontSize: hookText.length > 60 ? 104 : 118,
        lineHeight: 1.08,
        letterSpacing: -3,
        textAlign: "center",
      }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={
            isEmphasis(w)
              ? { color: ACCENT, fontSize: "1.4em", lineHeight: 1 }
              : undefined
          }
        >
          {w}
        </span>
      ))}
    </div>
  );
};

const SearchSlide: React.FC = () => (
  <>
    <Title n={1}>Nadie te encuentra en Google</Title>
    <Freeze frame={90}>
      <SearchVisual duration={84} />
    </Freeze>
  </>
);

const SeriousSlide: React.FC = () => (
  <>
    <Title n={2}>No transmite seriedad</Title>
    <div style={{ transform: "scale(0.85)", margin: "-40px 0" }}>
      <Freeze frame={80}>
        <CheckToCrossVisual duration={84} />
      </Freeze>
    </div>
    <Caption>
      Un cliente que va a pagar
      <br />
      quiere ver <span style={{ color: ACCENT }}>algo serio</span>.
    </Caption>
  </>
);

const ContactSlide: React.FC = () => (
  <>
    <Title n={3}>El cliente no sabe cómo contactarte</Title>
    <div style={{ transform: "scale(0.82)", margin: "-60px 0" }}>
      <Freeze frame={44}>
        <LostCursorVisual duration={84} />
      </Freeze>
    </div>
    <Caption>
      Si tiene que buscar cómo escribirte…{" "}
      <span style={{ color: ACCENT }}>se va</span>.
    </Caption>
  </>
);

const PHONE_SCALE = 0.72;
const ScaledPhone: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div style={{ width: 450 * PHONE_SCALE, height: 900 * PHONE_SCALE }}>
      <div style={{ transform: `scale(${PHONE_SCALE})`, transformOrigin: "0 0" }}>
        <Phone>{children}</Phone>
      </div>
    </div>
    <div style={{ marginTop: 26, fontSize: 34, fontWeight: 900, textAlign: "center" }}>
      {label}
    </div>
  </div>
);

const DemoSlide: React.FC = () => (
  <>
    <Title size={68}>
      Del formulario a tu página en <span style={{ color: ACCENT }}>72 hs</span>
    </Title>
    <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: -10 }}>
      <ScaledPhone label="Formulario de 5 min">
        <Freeze frame={78}>
          <FormScreen duration={92} />
        </Freeze>
      </ScaledPhone>
      <div
        style={{
          fontSize: 90,
          fontWeight: 900,
          color: ACCENT,
          marginBottom: 60,
        }}
      >
        →
      </div>
      <ScaledPhone label="Tu página online">
        <LandingScreen frame={0} duration={92} still />
      </ScaledPhone>
    </div>
  </>
);

const OfferSlide: React.FC = () => (
  <>
    <div style={{ fontSize: 70, fontWeight: 900, letterSpacing: -1 }}>Todo por</div>
    <div
      style={{
        fontSize: 220,
        fontWeight: 900,
        color: ACCENT,
        letterSpacing: -8,
        lineHeight: 1.05,
        marginBottom: 50,
      }}
    >
      ${formatARS(120000)}
    </div>
    <Freeze frame={100}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, width: "100%" }}>
        <HalfCard at={0} label="para arrancar" />
        <div style={{ fontSize: 70, fontWeight: 900, color: ACCENT }}>·</div>
        <HalfCard at={0} label="al terminar" />
      </div>
    </Freeze>
    <Caption>
      Pagás la mitad para arrancar
      <br />y la otra mitad cuando la ves terminada.
    </Caption>
  </>
);

const ClosingSlide: React.FC = () => (
  <>
    <div
      style={{
        fontSize: 100,
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: -3,
        textAlign: "center",
      }}
    >
      ¿Tu profesión necesita <span style={{ color: ACCENT }}>página</span>?
    </div>
    <div
      style={{
        marginTop: 70,
        fontSize: 210,
        fontWeight: 900,
        color: ACCENT,
        letterSpacing: 6,
        lineHeight: 1,
      }}
    >
      HAZEN
    </div>
    <div style={{ marginTop: 24, fontSize: 46, fontWeight: 800, color: "#CFCFCF" }}>
      Tu página en 72 hs · $120.000
    </div>
    <div
      style={{
        marginTop: 60,
        padding: "24px 56px",
        borderRadius: 70,
        backgroundColor: WHITE,
        color: BLACK,
        fontSize: 54,
        fontWeight: 900,
      }}
    >
      Pedí tu página hoy
    </div>
  </>
);

// ─── Registro ────────────────────────────────────────────────────────────
export type CarouselSlideProps = { hookText: string };

export const CAROUSEL_SLIDES: {
  id: string;
  render: (p: CarouselSlideProps) => React.ReactNode;
}[] = [
  { id: "Carrusel-01", render: (p) => <HookSlide hookText={p.hookText} /> },
  { id: "Carrusel-02", render: () => <SearchSlide /> },
  { id: "Carrusel-03", render: () => <SeriousSlide /> },
  { id: "Carrusel-04", render: () => <ContactSlide /> },
  { id: "Carrusel-05", render: () => <DemoSlide /> },
  { id: "Carrusel-06", render: () => <OfferSlide /> },
  { id: "Carrusel-07", render: () => <ClosingSlide /> },
];

/** Crea el componente de la slide N (1-based) con su marco común. */
export const makeSlide = (n: number): React.FC<CarouselSlideProps> => {
  const Slide: React.FC<CarouselSlideProps> = (props) => (
    <SlideFrame
      index={n}
      total={CAROUSEL_SLIDES.length}
      showSwipe={n < CAROUSEL_SLIDES.length}
    >
      {CAROUSEL_SLIDES[n - 1].render(props)}
    </SlideFrame>
  );
  Slide.displayName = `CarouselSlide${n}`;
  return Slide;
};
