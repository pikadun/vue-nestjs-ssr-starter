import { defineConfig, presetWind4 } from "unocss";

export default defineConfig({
    configFile: false,
    content: {
        filesystem: ["src/client/**/*.vue"],
    },
    presets: [presetWind4()],
});
