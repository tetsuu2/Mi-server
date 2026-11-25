import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {rise} from '../anim';
import {CityBackdrop} from '../components/CityBackdrop';
import {Caption} from '../components/Caption';
import {FlyingBird} from '../components/FlyingBird';
import {Phone, BEZEL, PHONE_W} from '../components/Phone';
import {PixelSprite} from '../components/PixelSprite';
import {SearchScreen, resultCenterY} from '../components/SearchScreen';
import {HAND} from '../components/sprites';
import type {RubroContent} from '../content';
import {BEATS, beatIn} from '../timings';

export const PHONE_LEFT = (1080 - PHONE_W) / 2;
const PHONE_TOP = 660;
const TYPE_START = 8;
const FRAMES_PER_CHAR = 1.5;

export const Scene1Hook: React.FC<{
  hookText: string;
  hookHighlight: string[];
  searchText: string;
  content: RubroContent;
}> = ({hookText, hookHighlight, searchText, content}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const second = beatIn('B1', BEATS.hookSecondSentence);

  const chars = Math.max(0, Math.min(searchText.length, Math.floor((frame - TYPE_START) / FRAMES_PER_CHAR)));
  const typeEnd = TYPE_START + searchText.length * FRAMES_PER_CHAR;
  const appear = [0, 1, 2].map((i) => rise(frame, fps, typeEnd + 3 + i * 6));

  // Dedo pixel que toca el primer resultado justo cuando aparece "Y eligió a otro."
  const handIn = rise(frame, fps, second - 12);
  const press = frame >= second && frame < second + 6 ? 1 : 0;
  const tapP = Math.max(0, Math.min(1, (frame - second) / 4));
  const targetY = PHONE_TOP + 8 + BEZEL + resultCenterY(0);

  const phoneIn = rise(frame, fps, 0);
  const float = Math.sin(frame / 14) * 5;

  return (
    <AbsoluteFill>
      <CityBackdrop tint="dusk" pan={0} />
      <FlyingBird y={150} start={4} speed={11} />
      <div
        style={{
          position: 'absolute',
          left: PHONE_LEFT,
          top: PHONE_TOP,
          transform: `translateY(${(1 - phoneIn) * 700 + float}px) rotate(${(1 - phoneIn) * 8}deg)`,
        }}
      >
        <Phone>
          <SearchScreen
            typed={searchText.slice(0, chars)}
            caret={chars < searchText.length ? true : Math.floor(frame / 8) % 2 === 0}
            results={content.results}
            appear={appear}
            tap={{index: 0, progress: tapP}}
          />
        </Phone>
      </div>
      {handIn > 0.01 ? (
        <div
          style={{
            position: 'absolute',
            left: PHONE_LEFT + 395 + (1 - handIn) * 300,
            top: targetY - 10 + (1 - handIn) * 500,
            transform: `scale(${press ? 0.85 : 1})`,
            transformOrigin: '30% 0%',
          }}
        >
          {tapP > 0 && tapP < 1 ? (
            <div
              style={{
                position: 'absolute',
                left: 12 - 40 * tapP,
                top: -40 * tapP,
                width: 48 + 80 * tapP,
                height: 48 + 80 * tapP,
                borderRadius: '50%',
                border: '6px solid #2F80ED',
                opacity: 1 - tapP,
              }}
            />
          ) : null}
          <PixelSprite sprite={HAND} px={9} />
        </div>
      ) : null}
      <Caption
        text={hookText}
        top={270}
        maxHeight={360}
        maxSize={82}
        highlight={hookHighlight}
        delays={(line, i, k) => (line.sentence === 0 ? i * 4 : second + k * 4)}
      />
    </AbsoluteFill>
  );
};
