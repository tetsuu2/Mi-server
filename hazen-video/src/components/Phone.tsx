import React from "react";

export const PHONE_WIDTH = 450;
export const PHONE_HEIGHT = 900;
export const PHONE_BEZEL = 14;
export const SCREEN_WIDTH = PHONE_WIDTH - PHONE_BEZEL * 2;
export const SCREEN_HEIGHT = PHONE_HEIGHT - PHONE_BEZEL * 2;

/** Mockup de celular genérico: marco redondeado + notch. */
export const Phone: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      width: PHONE_WIDTH,
      height: PHONE_HEIGHT,
      borderRadius: 72,
      backgroundColor: "#1E1E1E",
      padding: PHONE_BEZEL,
      boxSizing: "border-box",
      boxShadow:
        "0 0 0 3px #3A3A3A, 0 40px 90px rgba(0,0,0,0.7), inset 0 0 0 2px #000",
      position: "relative",
      flexShrink: 0,
      ...style,
    }}
  >
    <div
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        borderRadius: 58,
        overflow: "hidden",
        backgroundColor: "#F7F7F5",
        position: "relative",
      }}
    >
      {children}
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: "50%",
          width: 130,
          height: 36,
          marginLeft: -65,
          borderRadius: 18,
          backgroundColor: "#000",
          zIndex: 10,
        }}
      />
    </div>
  </div>
);
