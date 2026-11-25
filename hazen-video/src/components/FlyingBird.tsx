import React from 'react';
import {useCurrentFrame} from 'remotion';
import {PixelSprite} from './PixelSprite';
import {BIRD_DOWN, BIRD_UP} from './sprites';

// Pájaro pixel que cruza la pantalla aleteando.
export const FlyingBird: React.FC<{y: number; start?: number; speed?: number; px?: number; dir?: 1 | -1}> = ({
  y,
  start = 0,
  speed = 9,
  px = 7,
  dir = 1,
}) => {
  const frame = useCurrentFrame() - start;
  if (frame < 0) return null;
  const w = 18 * px;
  const x = dir === 1 ? -w + frame * speed : 1080 - frame * speed;
  if (x > 1100 || x < -w - 20) return null;
  const up = Math.floor(frame / 5) % 2 === 0;
  const bob = Math.sin(frame * 0.4) * 10;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + bob,
        transform: dir === -1 ? 'scaleX(-1)' : undefined,
      }}
    >
      <PixelSprite sprite={up ? BIRD_UP : BIRD_DOWN} px={px} />
    </div>
  );
};
