// Renderiza todas las slides del carrusel a out/carrusel/01.png … 07.png
// (empaqueta el proyecto una sola vez y saca cada imagen).
//
//   npm run carrusel
//   npm run carrusel -- --props='{"hookText":"Otro gancho"}'
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "out", "carrusel");
mkdirSync(outDir, { recursive: true });

const propsArg = process.argv.find((a) => a.startsWith("--props="));
const inputProps = propsArg ? JSON.parse(propsArg.slice("--props=".length)) : {};
// Opcional: Chrome propio (REMOTION_BROWSER_EXECUTABLE=/ruta/a/chrome)
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || null;

console.log("Empaquetando…");
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });
const slides = (
  await getCompositions(serveUrl, { inputProps, browserExecutable })
).filter((c) => c.id.startsWith("Carrusel-"));

for (const composition of slides) {
  const file = path.join(outDir, `${composition.id.replace("Carrusel-", "")}.png`);
  await renderStill({
    composition,
    serveUrl,
    output: file,
    inputProps,
    browserExecutable,
    imageFormat: "png",
  });
  console.log(`✓ ${path.relative(root, file)}`);
}
