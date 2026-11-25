// ─── Marca ────────────────────────────────────────────────────────────────
// Cambiá ACCENT por el color de tu marca: todo el video lo toma de acá.
export const ACCENT = "#00E07A";
export const BLACK = "#0A0A0A";
export const WHITE = "#FFFFFF";
export const GRAY = "#8A8A8A";

// ─── Formato ──────────────────────────────────────────────────────────────
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

// ─── Zona segura (UI de TikTok / Reels) ──────────────────────────────────
export const SAFE_TOP = 250;
export const SAFE_BOTTOM = 350;
export const SIDE_PADDING = 80;
/** Alto reservado para los subtítulos, al fondo de la zona segura. */
export const SUBTITLE_HEIGHT = 230;
/** Área útil para las escenas: entre SAFE_TOP y el bloque de subtítulos. */
export const CONTENT_TOP = SAFE_TOP;
export const CONTENT_BOTTOM = HEIGHT - SAFE_BOTTOM - SUBTITLE_HEIGHT;
export const CONTENT_HEIGHT = CONTENT_BOTTOM - CONTENT_TOP;

// ─── Animación ────────────────────────────────────────────────────────────
/** Spring rápido con rebote, estilo TikTok. */
export const SPRING_BOUNCY = { damping: 9, stiffness: 220, mass: 0.6 };
/** Spring rápido casi sin rebote. */
export const SPRING_SNAPPY = { damping: 20, stiffness: 260, mass: 0.6 };

// ─── Textos por defecto ──────────────────────────────────────────────────
export const DEFAULT_HOOK =
  "Abogado, contador, médico: tu Instagram NO es tu página web.";
