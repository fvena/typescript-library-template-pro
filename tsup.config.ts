import type { Options } from "tsup";
import { defineConfig } from "tsup";

const config: Options = {
  clean: true,
  dts: true,
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  outDir: "dist",
};

export default defineConfig(config);
