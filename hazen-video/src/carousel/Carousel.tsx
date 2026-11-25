import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Billboard} from '../components/Billboard';
import {Caption, CaptionBox} from '../components/Caption';
import {CityBackdrop} from '../components/CityBackdrop';
import {Facade} from '../components/Facade';
import {InstagramScreen} from '../components/InstagramScreen';
import {LandingScreen} from '../components/LandingScreen';
import {BEZEL, PHONE_W, Phone} from '../components/Phone';
import {PixelSprite} from '../components/PixelSprite';
import {SearchScreen, resultCenterY} from '../components/SearchScreen';
import {ARROW_UP, BIRD_DOWN, BIRD_UP, HAND} from '../components/sprites';
import {RUBROS, type Rubro, type RubroContent} from '../content';
import {ACCENT, BLACK, MONTSERRAT, PIXEL, RED, WHITE, readableOn} from '../theme';

// Carrusel de anuncios 1080x1350 (4:5). Cada frame de la composición es una placa.
// El fondo es un panorama continuo: al deslizar, la ciudad sigue de una placa a la otra.

export const SLIDE_W = 1080;
export const SLIDE_H = 1350;
export const SLIDES = 7;
const BG_OFFSET = 500; // recorta el fondo de 1920 para que entre en 1350

export type CarouselProps = {
  rubro: Rubro;
  hookText: string;
  searchText: string;
  hookHighlight: string[];
};

const Counter: React.FC<{i: number}> = ({i}) => (
  <div
    style={{
      position: 'absolute',
      top: 34,
      right: 36,
      background: BLACK,
      color: WHITE,
      fontFamily: PIXEL,
      fontSize: 26,
      padding: '6px 14px',
      borderRadius: 10,
      boxShadow: '0 6px 0 rgba(0,0,0,0.25)',
    }}
  >
    {i + 1}/{SLIDES}
  </div>
);

// Pájaros que cruzan el borde entre placas (posición en coordenadas del panorama).
const BIRDS = [
  {gx: SLIDE_W - 70, y: 300, up: true},
  {gx: SLIDE_W * 4 - 60, y: 120, up: false},
];

const SlideBirds: React.FC<{i: number}> = ({i}) => (
  <>
    {BIRDS.map((b, k) => {
      const x = b.gx - i * SLIDE_W;
      if (x < -140 || x > SLIDE_W) return null;
      return (
        <div key={k} style={{position: 'absolute', left: x, top: b.y}}>
          <PixelSprite sprite={b.up ? BIRD_UP : BIRD_DOWN} px={7} />
        </div>
      );
    })}
  </>
);

const ScaledPhone: React.FC<{left: number; top: number; scale: number; children: React.ReactNode; extra?: React.ReactNode}> = ({
  left,
  top,
  scale,
  children,
  extra,
}) => (
  <div style={{position: 'absolute', left, top, transform: `scale(${scale})`, transformOrigin: '0 0'}}>
    <Phone>{children}</Phone>
    {extra}
  </div>
);

const Stamp: React.FC<{top: number}> = ({top}) => (
  <div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', transform: 'rotate(-13deg)'}}>
    <div style={{border: `12px solid ${RED}`, borderRadius: 18, padding: 8, background: 'rgba(255,255,255,0.9)', boxShadow: '12px 12px 0 rgba(10,10,10,0.45)'}}>
      <div
        style={{
          border: `5px solid ${RED}`,
          borderRadius: 8,
          padding: '6px 34px',
          fontFamily: MONTSERRAT,
          fontWeight: 900,
          fontSize: 100,
          color: RED,
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
        }}
      >
        NO ALCANZA
      </div>
    </div>
  </div>
);

const Lamps = [1, 1, 1];

const CheckBadge: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 260 260">
    <circle cx={130} cy={130} r={126} fill={BLACK} />
    <circle cx={130} cy={130} r={100} fill="none" stroke={ACCENT} strokeWidth={20} />
    <path d="M 82 134 L 116 168 L 180 98" fill="none" stroke={ACCENT} strokeWidth={26} strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const SmallCheck: React.FC = () => (
  <div
    style={{
      width: 58,
      height: 58,
      flexShrink: 0,
      background: ACCENT,
      border: `5px solid ${BLACK}`,
      boxShadow: `5px 5px 0 ${BLACK}`,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width={34} height={34} viewBox="0 0 34 34">
      <path d="M 5 18 L 13 26 L 29 8" fill="none" stroke={readableOn(ACCENT)} strokeWidth={6} strokeLinecap="square" />
    </svg>
  </div>
);

const pct = (txt: string) => (
  <>
    <span style={{color: ACCENT}}>50%</span> {txt}
  </>
);

const Slide: React.FC<{i: number; props: CarouselProps; content: RubroContent}> = ({i, props, content}) => {
  const phoneScale = 0.8;
  const phoneLeft = (SLIDE_W - PHONE_W * phoneScale) / 2;

  switch (i) {
    // 1 · Gancho
    case 0:
      return (
        <>
          <ScaledPhone
            left={phoneLeft}
            top={520}
            scale={phoneScale}
            extra={
              <div style={{position: 'absolute', left: 395, top: 8 + BEZEL + resultCenterY(0) - 10}}>
                <PixelSprite sprite={HAND} px={9} />
              </div>
            }
          >
            <SearchScreen typed={props.searchText} caret={false} results={content.results} appear={[1, 1, 1]} tap={{index: 0, progress: 1}} />
          </ScaledPhone>
          <Caption still text={props.hookText} top={110} maxHeight={350} maxSize={78} highlight={props.hookHighlight} />
          <div style={{position: 'absolute', right: 40, bottom: 56, display: 'flex', alignItems: 'center', gap: 14}}>
            <CaptionBox size={44} appear={1} bg={ACCENT} color={readableOn(ACCENT)}>
              DESLIZÁ
            </CaptionBox>
            <PixelSprite sprite={ARROW_UP} px={8} style={{transform: 'rotate(90deg)'}} />
          </div>
        </>
      );
    // 2 · No existís
    case 1: {
      const s = 0.9;
      return (
        <>
          <ScaledPhone left={(SLIDE_W - PHONE_W * s) / 2} top={420} scale={s}>
            <SearchScreen
              typed={props.searchText}
              caret={false}
              results={content.results}
              appear={[1, 1, 1]}
              slot={{appear: 1, shakeX: 0, fade: 0}}
            />
          </ScaledPhone>
          <Caption still text="Sin página, para Google no existís" top={110} maxHeight={240} maxSize={78} highlight={['no', 'existís']} />
        </>
      );
    }
    // 3 · Instagram no alcanza
    case 2:
      return (
        <>
          <ScaledPhone left={phoneLeft} top={400} scale={phoneScale}>
            <InstagramScreen ig={content.instagram} gridAppear={1} />
          </ScaledPhone>
          <Stamp top={820} />
          <Caption still text="Con Instagram solo, nadie confía" top={110} maxHeight={240} maxSize={78} highlight={['nadie', 'confía']} />
        </>
      );
    // 4 · Hazen, lista en 72 hs
    case 3:
      return (
        <>
          <Facade top={40 + 80 + 420 + 150} seed="c4" />
          <div style={{position: 'absolute', left: 70, top: 40}}>
            <Billboard width={940} height={420} lamps={Lamps}>
              <div
                style={{
                  fontFamily: MONTSERRAT,
                  fontWeight: 900,
                  fontSize: 230,
                  lineHeight: 1,
                  color: ACCENT,
                  letterSpacing: '0.05em',
                  textShadow: `0 0 40px ${ACCENT}66, 10px 10px 0 rgba(0,0,0,0.5)`,
                }}
              >
                HAZEN
              </div>
              <div style={{fontFamily: PIXEL, fontSize: 32, color: WHITE, marginTop: 18, letterSpacing: 2}}>PÁGINAS WEB PARA PROFESIONALES</div>
            </Billboard>
          </div>
          <div style={{position: 'absolute', top: 790, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <CaptionBox size={68} appear={1}>
              TU PÁGINA LISTA EN
            </CaptionBox>
            <CaptionBox size={150} appear={1} color={ACCENT}>
              72 HS
            </CaptionBox>
          </div>
        </>
      );
    // 5 · Así queda tu página
    case 4: {
      const items = ['TUS SERVICIOS', 'BOTÓN DE WHATSAPP', 'MAPA Y HORARIOS', 'LISTA EN 72 HS'];
      return (
        <>
          <ScaledPhone left={60} top={330} scale={0.82}>
            <LandingScreen content={content} blocks={[1, 1, 1, 1, 1, 1, 1]} scroll={150} pulse={0} pinBounce={0} />
          </ScaledPhone>
          <div style={{position: 'absolute', left: 560, right: 30, top: 420, display: 'flex', flexDirection: 'column', gap: 34}}>
            {items.map((t) => (
              <div key={t} style={{display: 'flex', alignItems: 'center', gap: 16}}>
                <SmallCheck />
                <div
                  style={{
                    background: BLACK,
                    color: WHITE,
                    fontFamily: MONTSERRAT,
                    fontWeight: 900,
                    fontSize: 36,
                    lineHeight: 1.1,
                    padding: '10px 16px',
                    borderRadius: 12,
                    boxShadow: '0 8px 0 rgba(0,0,0,0.25)',
                  }}
                >
                  {t}
                </div>
              </div>
            ))}
          </div>
          <Caption still text="Así queda tu página" top={110} maxHeight={200} maxSize={84} />
        </>
      );
    }
    // 6 · Oferta
    case 5:
      return (
        <>
          <Facade top={40 + 80 + 380 + 150} seed="c6" />
          <div style={{position: 'absolute', left: 60, top: 40}}>
            <Billboard width={960} height={380} lamps={Lamps}>
              <div style={{fontFamily: PIXEL, fontSize: 36, color: ACCENT, letterSpacing: 3}}>TU LANDING PAGE</div>
              <div
                style={{
                  fontFamily: MONTSERRAT,
                  fontWeight: 900,
                  fontSize: 168,
                  lineHeight: 1.05,
                  color: WHITE,
                  textShadow: '10px 10px 0 rgba(0,0,0,0.5)',
                  marginTop: 6,
                }}
              >
                $120.000
              </div>
            </Billboard>
          </div>
          <div style={{position: 'absolute', top: 720, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <CaptionBox size={64} appear={1}>
              {pct('PARA ARRANCAR')}
            </CaptionBox>
            <div style={{width: 18, height: 18, background: ACCENT, boxShadow: `4px 4px 0 ${BLACK}`}} />
            <CaptionBox size={64} appear={1}>
              {pct('AL TERMINAR')}
            </CaptionBox>
          </div>
          <div style={{position: 'absolute', top: 1010, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <CheckBadge size={270} />
          </div>
        </>
      );
    // 7 · Cierre
    default:
      return (
        <>
          <div
            style={{
              position: 'absolute',
              top: 210,
              left: 0,
              right: 0,
              textAlign: 'center',
              fontFamily: MONTSERRAT,
              fontWeight: 900,
              fontSize: 220,
              lineHeight: 1,
              letterSpacing: '0.05em',
              color: ACCENT,
              textShadow: `0 0 40px ${ACCENT}AA, 12px 12px 0 rgba(0,0,0,0.55)`,
            }}
          >
            HAZEN
          </div>
          <div style={{position: 'absolute', top: 480, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
            <div style={{background: BLACK, color: WHITE, fontFamily: PIXEL, fontSize: 34, letterSpacing: 2, padding: '8px 18px', borderRadius: 10}}>
              PÁGINAS WEB PARA PROFESIONALES
            </div>
          </div>
          <div style={{position: 'absolute', top: 600, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14}}>
            <CaptionBox size={80} appear={1}>
              PEDÍ TU PÁGINA HOY
            </CaptionBox>
            <CaptionBox size={52} appear={1}>
              <span style={{color: ACCENT}}>$120.000</span> · LISTA EN <span style={{color: ACCENT}}>72 HS</span>
            </CaptionBox>
          </div>
          <div style={{position: 'absolute', top: 900, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
            <CaptionBox size={60} appear={1} bg={ACCENT} color={readableOn(ACCENT)}>
              ESCRIBINOS 👇
            </CaptionBox>
            <PixelSprite sprite={ARROW_UP} px={14} style={{transform: 'rotate(180deg)'}} />
          </div>
        </>
      );
  }
};

export const Carousel: React.FC<CarouselProps> = (props) => {
  const i = useCurrentFrame();
  const content = RUBROS[props.rubro];
  return (
    <AbsoluteFill style={{background: BLACK, overflow: 'hidden'}}>
      <CityBackdrop tint="dusk" seamless pan={i * SLIDE_W} drift={0} offsetY={BG_OFFSET} />
        <SlideBirds i={i} />
        <Slide i={i} props={props} content={content} />
        <Counter i={i} />
    </AbsoluteFill>
  );
};
