import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { BLACK } from "./constants";
import { MONTSERRAT } from "./fonts";
import { TIMINGS, BlockId } from "./timings";
import { Subtitles } from "./components/Subtitles";
import { HookScene } from "./scenes/HookScene";
import { ReasonsScene } from "./scenes/ReasonsScene";
import { DemoScene } from "./scenes/DemoScene";
import { OfferScene } from "./scenes/OfferScene";
import { ClosingScene } from "./scenes/ClosingScene";

export type HazenVideoProps = {
  /** Texto del gancho. Las palabras en MAYÚSCULAS salen en ACCENT y más grandes. */
  hookText: string;
  /** Lo completa calculateMetadata según exista public/musica.mp3. */
  hasMusic?: boolean;
};

export const HazenVideo: React.FC<HazenVideoProps> = ({
  hookText,
  hasMusic,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  // Cada escena recibe su duración en frames para escalar sus animaciones.
  const scenes: Record<BlockId, (duration: number) => React.ReactNode> = {
    B1: (d) => <HookScene hookText={hookText} duration={d} />,
    B2: (d) => <ReasonsScene duration={d} />,
    B3: (d) => <DemoScene duration={d} />,
    B4: (d) => <OfferScene duration={d} />,
    B5: (d) => <ClosingScene duration={d} />,
  };

  return (
    <AbsoluteFill style={{ backgroundColor: BLACK, fontFamily: MONTSERRAT }}>
      {/* Escenas con cortes duros: cada una dura hasta que empieza la siguiente */}
      {TIMINGS.map((block, i) => {
        const from = i === 0 ? 0 : Math.round(block.start * fps);
        const next = TIMINGS[i + 1];
        const to = next ? Math.round(next.start * fps) : durationInFrames;
        if (to <= from) return null;
        return (
          <Sequence
            key={block.id}
            from={from}
            durationInFrames={to - from}
            name={`${block.id} escena`}
          >
            {scenes[block.id](to - from)}
          </Sequence>
        );
      })}

      <Subtitles />

      <Audio src={staticFile("voz.mp3")} />
      {hasMusic ? <Audio src={staticFile("musica.mp3")} volume={0.12} loop /> : null}
    </AbsoluteFill>
  );
};
