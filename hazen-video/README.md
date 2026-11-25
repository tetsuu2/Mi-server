# Hazen – videos verticales (Remotion)

1080x1920 · 30 fps · 30 s. Sin audio ni subtítulos (se agregan en CapCut).
Estilo pixel-art 8-bit: ciudad al atardecer, carteles con reflectores y textos en cajas negras estilo TikTok.

## Uso

```bash
npm install
npm run dev          # Remotion Studio para previsualizar y editar props
npm run render       # out/HazenVideo1.mp4
npm run render:b     # out/HazenV1-B.mp4
npm run render:c     # out/HazenV1-C.mp4
npm run render:d     # out/HazenV1-D.mp4
npm run render:voz   # out/HazenVideo1-Voz.mp4 (necesita la locución en public/locucion.mp3)
npm run render:all   # las 4
```

> Remotion no permite `_` en los IDs de composición, por eso las variantes se llaman `HazenV1-B`, `HazenV1-C` y `HazenV1-D`.

## Carrusel de anuncios (1080x1350, 4:5)

7 placas con la misma historia y estilo que el video. El fondo es un panorama continuo: al deslizar, la ciudad sigue de una placa a la otra.

```bash
npm run carrusel:dentista   # out/carrusel/dentista/placa-0.png … placa-6.png
npm run carrusel:abogado
npm run carrusel:contador
npm run carrusel:all
```

Placas: 1 gancho · 2 sin página no existís · 3 Instagram no alcanza · 4 HAZEN lista en 72 hs · 5 así queda tu página · 6 $120.000 50/50 · 7 cierre.
El código está en `src/carousel/Carousel.tsx` (cada frame de la composición es una placa).

## Qué editar

| Qué | Dónde |
| --- | --- |
| Color de marca | `ACCENT` en `src/theme.ts` |
| Tiempos de bloques (B1–B5) y momentos internos | `src/timings.ts` (segundos) |
| Gancho, búsqueda, palabras en rojo | props `hookText`, `searchText`, `hookHighlight` en `src/Root.tsx` |
| Resultados inventados, perfil y landing por rubro | `src/content.ts` |

Los `BEATS` de `src/timings.ts` vienen alineados con las pausas de la locución de ElevenLabs (27,2 s).

## Estructura

- `src/scenes/` – una escena por bloque (Gancho, No existís, Solución, Oferta, Cierre)
- `src/components/` – celular, buscador, perfil, landing, cartel, ciudad pixel, sprites
