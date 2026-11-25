import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile} from 'remotion';
import {RUBROS, resolveRubro, type Rubro} from './content';
import {Scene1Hook} from './scenes/Scene1Hook';
import {Scene2NoExistis} from './scenes/Scene2NoExistis';
import {Scene3Solucion} from './scenes/Scene3Solucion';
import {Scene4Oferta} from './scenes/Scene4Oferta';
import {Scene5Cierre} from './scenes/Scene5Cierre';
import {BLACK} from './theme';
import {block} from './timings';

export type HazenProps = {
  hookText: string;
  searchText: string;
  // Palabras del gancho que van en rojo.
  hookHighlight?: string[];
  // Rubro de los resultados y la landing. Si no se pasa, se deduce de searchText.
  rubro?: Rubro;
  // true = incluye public/locucion.mp3 (solo para chequear sincronización).
  withVoice?: boolean;
};

export const defaultHazenProps: HazenProps = {
  hookText: 'Un paciente te acaba de buscar. Y eligió a otro.',
  searchText: 'dentista en Resistencia',
  hookHighlight: ['otro'],
};

export const HazenVideo1: React.FC<HazenProps> = ({hookText, searchText, hookHighlight = ['otro'], rubro, withVoice = false}) => {
  const content = RUBROS[resolveRubro(searchText, rubro)];
  // Cortes duros: cada escena es una Sequence sin transiciones.
  return (
    <AbsoluteFill style={{background: BLACK}}>
      {withVoice ? <Audio src={staticFile('locucion.mp3')} /> : null}
      <Sequence {...block('B1')} premountFor={15}>
        <Scene1Hook hookText={hookText} hookHighlight={hookHighlight} searchText={searchText} content={content} />
      </Sequence>
      <Sequence {...block('B2')} premountFor={15}>
        <Scene2NoExistis searchText={searchText} content={content} />
      </Sequence>
      <Sequence {...block('B3')} premountFor={15}>
        <Scene3Solucion content={content} />
      </Sequence>
      <Sequence {...block('B4')} premountFor={15}>
        <Scene4Oferta />
      </Sequence>
      <Sequence {...block('B5')} premountFor={15}>
        <Scene5Cierre />
      </Sequence>
    </AbsoluteFill>
  );
};
