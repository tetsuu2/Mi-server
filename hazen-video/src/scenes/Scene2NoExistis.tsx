import React from 'react';
import {AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ramp, rise, shake} from '../anim';
import {CityBackdrop} from '../components/CityBackdrop';
import {Caption} from '../components/Caption';
import {InstagramScreen} from '../components/InstagramScreen';
import {Phone, PHONE_W} from '../components/Phone';
import {SearchScreen} from '../components/SearchScreen';
import type {RubroContent} from '../content';
import {BEATS, beatIn, block} from '../timings';
import {MONTSERRAT, RED} from '../theme';

const PHONE_LEFT = (1080 - PHONE_W) / 2;

// Primera mitad: zoom a la lista, aparece el lugar vacío "Vos".
const PartA: React.FC<{searchText: string; content: RubroContent; duration: number}> = ({searchText, content, duration}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const zoom = 1.12 + 0.24 * spring({frame, fps, config: {damping: 14, stiffness: 160}});
  const slotIn = rise(frame, fps, 14);
  const fade = ramp(frame, duration - 22, duration - 4);
  const sh = frame > 14 ? Math.sin(frame * 2.1) * (10 + 6 * Math.sin(frame * 0.3)) : 0;
  // El punto de anclaje del zoom es el 4.º lugar (y=838 dentro del celular)
  const ANCHOR_Y = 838;
  return (
    <AbsoluteFill>
      <CityBackdrop tint="night" pan={-260} />
      <div
        style={{
          position: 'absolute',
          left: PHONE_LEFT,
          top: 1380 - ANCHOR_Y,
          transformOrigin: `${PHONE_W / 2}px ${ANCHOR_Y}px`,
          transform: `scale(${zoom})`,
        }}
      >
        <Phone>
          <SearchScreen
            typed={searchText}
            caret={false}
            results={content.results}
            appear={[1, 1, 1]}
            slot={{appear: slotIn, shakeX: sh, fade}}
          />
        </Phone>
      </div>
      <Caption text="Sin página, para Google no existís" top={270} maxHeight={240} maxSize={80} highlight={['no', 'existís']} />
    </AbsoluteFill>
  );
};

// Segunda mitad: perfil de Instagram con sello "No alcanza".
const PartB: React.FC<{content: RubroContent}> = ({content}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phoneIn = spring({frame, fps, config: {damping: 11, stiffness: 220}});
  const STAMP_AT = 24;
  const stamp = spring({frame: frame - STAMP_AT, fps, config: {damping: 13, stiffness: 260, mass: 0.8}});
  const impact = frame >= STAMP_AT + 3 && frame < STAMP_AT + 14 ? shake(frame, 14 * (1 - (frame - STAMP_AT - 3) / 11)) : {x: 0, y: 0};
  return (
    <AbsoluteFill>
      <CityBackdrop tint="night" pan={260} />
      <div
        style={{
          position: 'absolute',
          left: PHONE_LEFT,
          top: 610,
          transform: `translate(${impact.x}px, ${impact.y}px) scale(${0.92 + 0.08 * phoneIn})`,
        }}
      >
        <Phone>
          <InstagramScreen ig={content.instagram} gridAppear={ramp(frame, 2, 16)} />
        </Phone>
      </div>
      {frame >= STAMP_AT ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 1060,
            display: 'flex',
            justifyContent: 'center',
            transform: `scale(${2.6 - 1.6 * stamp}) rotate(-13deg)`,
            opacity: Math.min(1, stamp * 3),
          }}
        >
          <div
            style={{
              border: `12px solid ${RED}`,
              borderRadius: 18,
              padding: 8,
              background: 'rgba(255,255,255,0.88)',
              boxShadow: '12px 12px 0 rgba(10,10,10,0.45)',
            }}
          >
            <div
              style={{
                border: `5px solid ${RED}`,
                borderRadius: 8,
                padding: '6px 34px',
                fontFamily: MONTSERRAT,
                fontWeight: 900,
                fontSize: 104,
                color: RED,
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
              }}
            >
              NO ALCANZA
            </div>
          </div>
        </div>
      ) : null}
      <Caption text="Con Instagram solo, nadie confía" top={270} maxHeight={240} maxSize={80} highlight={['nadie', 'confía']} />
    </AbsoluteFill>
  );
};

export const Scene2NoExistis: React.FC<{searchText: string; content: RubroContent}> = ({searchText, content}) => {
  const split = beatIn('B2', BEATS.b2Split);
  const total = block('B2').durationInFrames;
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={split}>
        <PartA searchText={searchText} content={content} duration={split} />
      </Sequence>
      <Sequence from={split} durationInFrames={total - split}>
        <PartB content={content} />
      </Sequence>
    </AbsoluteFill>
  );
};
