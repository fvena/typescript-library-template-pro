import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  test: {
    clearMocks: true,
    coverage: {
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "lcovonly"],
    },
    environment: "node",
    globals: true,
    workspace: [
      {
        extends: true,
        test: {
          environment: "node",
          include: ["test/core/**/*.test.ts", "test/terminal/**/*.test.ts"],
          name: "terminal",
        },
      },
      {
        extends: true,
        test: {
          environment: "jsdom",
          include: ["test/browser/**/*.test.ts"],
          name: "browser",
        },
      },
    ],
  },
});
