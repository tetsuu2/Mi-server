import React from "react";
import { AbsoluteFill } from "remotion";
import { BLACK, CONTENT_HEIGHT, CONTENT_TOP, SIDE_PADDING } from "../constants";

/** Fondo plano + área útil dentro de la zona segura (sin los subtítulos). */
export const SceneFrame: React.FC<{
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}> = ({ children, background = BLACK, style }) => (
  <AbsoluteFill style={{ backgroundColor: background }}>
    <div
      style={{
        position: "absolute",
        top: CONTENT_TOP,
        left: SIDE_PADDING,
        right: SIDE_PADDING,
        height: CONTENT_HEIGHT,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </div>
  </AbsoluteFill>
);
