import React from "react";
import {
  CalculateMetadataFunction,
  Composition,
  getStaticFiles,
  staticFile,
} from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { HazenVideo, HazenVideoProps } from "./HazenVideo";
import { DEFAULT_HOOK, FPS, HEIGHT, WIDTH } from "./constants";
import {
  CAROUSEL_HEIGHT,
  CAROUSEL_HOOK,
  CAROUSEL_SLIDES,
  CAROUSEL_WIDTH,
  makeSlide,
} from "./carousel/Carousel";

// Carrusel de imágenes para anuncios: una composición por slide; se renderiza
// el frame 0. Duran 150 frames (y no 1, como un <Still>) para que <Freeze>
// pueda mostrar los mockups del video en su estado final.
const SLIDE_COMPONENTS = CAROUSEL_SLIDES.map((_, i) => makeSlide(i + 1));

/** ¿Existe public/musica.mp3? (si no, el video se renderiza sin música) */
const musicExists = async (): Promise<boolean> => {
  try {
    const files = getStaticFiles();
    if (files.length > 0) {
      return files.some((f) => f.name === "musica.mp3");
    }
  } catch {
    // getStaticFiles() no disponible: probamos pidiendo el archivo.
  }
  try {
    const res = await fetch(staticFile("musica.mp3"), { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
};

/** La duración del video = duración de public/voz.mp3. */
const calculateMetadata: CalculateMetadataFunction<HazenVideoProps> = async ({
  props,
}) => {
  const [voiceSeconds, hasMusic] = await Promise.all([
    getAudioDurationInSeconds(staticFile("voz.mp3")),
    musicExists(),
  ]);
  return {
    durationInFrames: Math.ceil(voiceSeconds * FPS),
    props: { ...props, hasMusic },
  };
};

// Remotion solo acepta letras, números y "-" en los IDs (no "_").
const VARIANTS: { id: string; hookText: string }[] = [
  { id: "HazenVideo2", hookText: DEFAULT_HOOK },
  {
    id: "HazenV2-B",
    hookText: "Si solo tenés Instagram, estás perdiendo clientes todos los días.",
  },
  {
    id: "HazenV2-C",
    hookText:
      "Esto es lo que ve un cliente cuando te busca en Google (y no estás).",
  },
  { id: "HazenV2-D", hookText: "Tu competencia tiene página web. ¿Y vos?" },
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {VARIANTS.map((v) => (
        <Composition
          key={v.id}
          id={v.id}
          component={HazenVideo}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          // Se reemplaza por la duración real del audio en calculateMetadata.
          durationInFrames={30 * FPS}
          defaultProps={{ hookText: v.hookText, hasMusic: false }}
          calculateMetadata={calculateMetadata}
        />
      ))}

      {CAROUSEL_SLIDES.map((slide, i) => (
        <Composition
          key={slide.id}
          id={slide.id}
          component={SLIDE_COMPONENTS[i]}
          width={CAROUSEL_WIDTH}
          height={CAROUSEL_HEIGHT}
          fps={FPS}
          durationInFrames={150}
          defaultProps={{ hookText: CAROUSEL_HOOK }}
        />
      ))}
    </>
  );
};
