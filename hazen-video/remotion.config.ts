// https://www.remotion.dev/docs/config
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// H.264 con buena calidad para subir a TikTok / Reels
Config.setCodec("h264");
Config.setCrf(18);
