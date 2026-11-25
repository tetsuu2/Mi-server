import React from 'react';
import {Composition} from 'remotion';
import {HazenVideo1, defaultHazenProps, type HazenProps} from './HazenVideo1';
import {DURATION_SECONDS, FPS, HEIGHT, WIDTH} from './timings';
import {Carousel, SLIDES, SLIDE_H, SLIDE_W, type CarouselProps} from './carousel/Carousel';

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

// Carruseles 1080x1350: cada frame es una placa (frame 0 = placa 1).
const carousels: {id: string; props: CarouselProps}[] = [
  {
    id: 'Carrusel-Dentista',
    props: {rubro: 'dentista', hookText: 'Un paciente te acaba de buscar. Y eligió a otro.', searchText: 'dentista en Resistencia', hookHighlight: ['otro']},
  },
  {
    id: 'Carrusel-Abogado',
    props: {rubro: 'abogado', hookText: 'Un cliente te acaba de buscar. Y llamó a otro estudio.', searchText: 'abogado en Resistencia', hookHighlight: ['otro', 'estudio']},
  },
  {
    id: 'Carrusel-Contador',
    props: {rubro: 'contador', hookText: 'Alguien necesitaba un contador hoy. No fuiste vos.', searchText: 'contador en Resistencia', hookHighlight: ['vos']},
  },
];

export const RemotionRoot: React.FC = () => (
  <>
    {variants.map((v) => (
      <Composition key={v.id} id={v.id} {...common} defaultProps={v.props} />
    ))}
    {carousels.map((c) => (
      <Composition key={c.id} id={c.id} component={Carousel} durationInFrames={SLIDES} fps={30} width={SLIDE_W} height={SLIDE_H} defaultProps={c.props} />
    ))}
  </>
);
