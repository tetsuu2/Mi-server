import React from 'react';

export type SpriteDef = {rows: string[]; palette: Record<string, string>};

// Dibuja pixel art a partir de filas de caracteres ("." = transparente).
export const PixelSprite: React.FC<{
  sprite: SpriteDef;
  px: number;
  style?: React.CSSProperties;
  colorOverride?: Record<string, string>;
}> = ({sprite, px, style, colorOverride}) => {
  const w = Math.max(...sprite.rows.map((r) => r.length));
  const h = sprite.rows.length;
  const pal = {...sprite.palette, ...colorOverride};
  const rects: React.ReactNode[] = [];
  sprite.rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      if (c === '.' || !pal[c]) {
        x++;
        continue;
      }
      // Agrupa píxeles iguales consecutivos en un solo rect.
      let run = 1;
      while (x + run < row.length && row[x + run] === c) run++;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={pal[c]} />);
      x += run;
    }
  });
  return (
    <svg
      width={w * px}
      height={h * px}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      style={{display: 'block', overflow: 'visible', ...style}}
    >
      {rects}
    </svg>
  );
};
