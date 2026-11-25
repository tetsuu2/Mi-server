import React from 'react';
import {Composition} from 'remotion';
import {HazenVideo1, defaultHazenProps, type HazenProps} from './HazenVideo1';
import {DURATION_SECONDS, FPS, HEIGHT, WIDTH} from './timings';

const common = {
  component: HazenVideo1,
  durationInFrames: DURATION_SECONDS * FPS,
  fps: FPS,
  width: WIDTH,
  height: HEIGHT,
};

const variants: {id: string; props: HazenProps}[] = [
  {id: 'HazenVideo1', props: defaultHazenProps},
  // Igual a HazenVideo1 pero con la locución, para chequear la sincronización.
  {id: 'HazenVideo1-Voz', props: {...defaultHazenProps, withVoice: true}},
  {
    id: 'HazenV1-B',
    props: {
      hookText: 'Tus pacientes te buscan en Google. ¿Te encuentran?',
      searchText: 'dentista en Resistencia',
      hookHighlight: ['encuentran'],
      rubro: 'dentista',
    },
  },
  {
    id: 'HazenV1-C',
    props: {
      hookText: 'Un cliente te acaba de buscar. Y llamó a otro estudio.',
      searchText: 'abogado en Resistencia',
      hookHighlight: ['otro', 'estudio'],
      rubro: 'abogado',
    },
  },
  {
    id: 'HazenV1-D',
    props: {
      hookText: 'Alguien necesitaba un contador hoy. No fuiste vos.',
      searchText: 'contador en Resistencia',
      hookHighlight: ['vos'],
      rubro: 'contador',
    },
  },
];

export const RemotionRoot: React.FC = () => (
  <>
    {variants.map((v) => (
      <Composition key={v.id} id={v.id} {...common} defaultProps={v.props} />
    ))}
  </>
);
