import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ACCENT,
  SAFE_BOTTOM,
  SIDE_PADDING,
  SPRING_SNAPPY,
  SUBTITLE_HEIGHT,
  WHITE,
} from "../constants";
import { getSubtitleGroups } from "../lib/words";

/** Contorno negro grueso para que se lea sobre cualquier fondo. */
const OUTLINE = (() => {
  const shadows: string[] = [];
  const r = 7;
  for (let a = 0; a < 360; a += 30) {
    const rad = (a * Math.PI) / 180;
    shadows.push(
      `${(Math.cos(rad) * r).toFixed(1)}px ${(Math.sin(rad) * r).toFixed(1)}px 0 #000`,
    );
  }
  shadows.push("0 10px 24px rgba(0,0,0,0.6)");
  return shadows.join(", ");
})();

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const groups = useMemo(() => getSubtitleGroups(), []);
  const group = groups.find((g) => t >= g.start && t < g.end);
  if (!group) return null;

  const groupFrame = frame - Math.round(group.start * fps);
  const pop = spring({ frame: groupFrame, fps, config: SPRING_SNAPPY });

  return (
    <AbsoluteFill
      style={{
        top: undefined,
        bottom: SAFE_BOTTOM,
        height: SUBTITLE_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: SIDE_PADDING,
        paddingRight: SIDE_PADDING,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: 22,
          rowGap: 0,
          transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])})`,
          fontWeight: 900,
          fontSize: 74,
          lineHeight: 1.12,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: -1,
        }}
      >
        {group.words.map((w) => {
          const active = t >= w.start && t < w.end;
          return (
            <span
              key={w.index}
              style={{
                color: active ? ACCENT : WHITE,
                textShadow: OUTLINE,
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
