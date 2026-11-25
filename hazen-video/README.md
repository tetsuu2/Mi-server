# Hazen — video vertical TikTok / Reels (Remotion)

1080×1920, 30 fps. La duración sale de `public/voz.mp3` (se mide en `calculateMetadata`).
Todo lo visual está hecho con código: sin videos ni imágenes externas.

## Comandos

```bash
npm install
npm run dev                 # Remotion Studio (preview en el navegador)

npm run build               # → out/HazenVideo2.mp4  (versión principal)
npm run render:b            # → out/HazenV2-B.mp4
npm run render:c            # → out/HazenV2-C.mp4
npm run render:d            # → out/HazenV2-D.mp4
npm run render:all          # las cuatro

npm run carrusel            # → out/carrusel/01.png … 07.png (carrusel para anuncios)

npm run lint                # chequeo de tipos (tsc)
npm run timings             # recalcula los tiempos proporcionales de la voz
```

Equivalente con npx: `npx remotion render HazenV2-B out/HazenV2-B.mp4`.
Para probar otro gancho sin tocar código:
`npx remotion render HazenVideo2 out/test.mp4 --props='{"hookText":"Tu texto acá"}'`

> Remotion solo acepta letras, números y `-` en los IDs de composición, por eso las
> variantes se llaman `HazenV2-B`, `HazenV2-C` y `HazenV2-D` (con guion, no `_`).

## Carrusel de imágenes para anuncios

7 slides de 1080×1350 (4:5, feed de Instagram/Facebook; también sirve para el modo foto
de TikTok), con la misma estética y los mismos mockups del video:

1. Gancho · 2. Nadie te encuentra en Google · 3. No transmite seriedad ·
4. El cliente no sabe cómo contactarte · 5. Del formulario a tu página en 72 hs ·
6. $120.000 (50 % + 50 %) · 7. Cierre "Pedí tu página hoy"

Textos y slides: `src/carousel/Carousel.tsx`. Para cambiar el formato, editá
`CAROUSEL_WIDTH` / `CAROUSEL_HEIGHT`. Una sola slide:
`npx remotion still Carrusel-03 out/carrusel/03.png`.
Otro gancho para la primera: `npm run carrusel -- --props='{"hookText":"Tu texto"}'`.

## Archivos que podés cambiar

| Qué | Dónde |
| --- | --- |
| Color de marca | `ACCENT` en `src/constants.ts` |
| Tiempos de cada bloque de la voz | `src/timings.ts` |
| Ganchos de las variantes | `VARIANTS` en `src/Root.tsx` |
| Voz en off | `public/voz.mp3` |
| Música (opcional, al 12 %) | `public/musica.mp3` — si no está, renderiza igual |

**Gancho:** las palabras escritas enteras en MAYÚSCULAS (como `NO`) salen en ACCENT y más grandes.

## Tiempos (`src/timings.ts`)

Cada bloque B1…B5 tiene `start` y `end` en segundos (cuándo habla la voz).
Cada escena va del `start` de su bloque al `start` del siguiente (corte duro), y los
subtítulos reparten las palabras uniformemente entre `start` y `end`.

Hay dos juegos de tiempos: `PROPORTIONAL_TIMINGS` (por cantidad de palabras) y
`MEASURED_TIMINGS` (ajustado a las pausas reales de la voz). `TIMINGS` elige cuál se usa.
Si cambiás la voz, corré `npm run timings` y pegá el resultado.

## Estructura

```
src/
  Root.tsx            composiciones + calculateMetadata (duración = voz.mp3)
  HazenVideo.tsx      arma las escenas según timings.ts + audio + subtítulos
  timings.ts          ← tiempos editables
  constants.ts        paleta, zona segura (250 px arriba / 350 px abajo), springs
  scenes/             Hook, Reasons, Demo, Offer, Closing
  components/         Subtitles, Phone, SceneFrame
  lib/words.ts        reparto de palabras y grupos de subtítulos (2–4 palabras)
```
