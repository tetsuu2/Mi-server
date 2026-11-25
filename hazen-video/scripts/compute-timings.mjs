// Reparte la duración de public/voz.mp3 entre los bloques del guion,
// en forma proporcional a la cantidad de palabras de cada uno.
//
//   npm run timings            → mide public/voz.mp3 con el ffprobe de Remotion
//   npm run timings -- 31.2    → usa una duración dada (en segundos)
//
// Imprime un array listo para pegar en PROPORTIONAL_TIMINGS (src/timings.ts).
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

let duration = Number(process.argv[2]);
if (!duration) {
  const out = execSync(
    'npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 public/voz.mp3',
    { cwd: root, encoding: "utf8" },
  );
  duration = Number(out.trim().split("\n").pop());
}
if (!duration) throw new Error("No pude medir la duración de public/voz.mp3");

const src = readFileSync(path.join(root, "src/timings.ts"), "utf8");
const textBlock = src.match(/const TEXT[^{]*\{([\s\S]*?)\n\};/)[1];
const blocks = [...textBlock.matchAll(/(B\d):\s*"([^"]*)"/g)].map((m) => ({
  id: m[1],
  words: m[2].split(/\s+/).filter(Boolean).length,
}));
const total = blocks.reduce((a, b) => a + b.words, 0);

let acc = 0;
const r = (n) => Math.round(n * 1000) / 1000;
console.log(`// voz.mp3: ${duration.toFixed(3)} s · ${total} palabras`);
console.log(`// (${blocks.map((b) => b.words).join(" / ")})`);
console.log("export const PROPORTIONAL_TIMINGS: BlockTiming[] = [");
for (const b of blocks) {
  const start = (acc / total) * duration;
  acc += b.words;
  const end = (acc / total) * duration;
  console.log(`  { id: "${b.id}", text: TEXT.${b.id}, start: ${r(start)}, end: ${r(end)} },`);
}
console.log("];");
