import { createApp } from "./ssr";

const baseElement = document.querySelector("base");
const basePath = baseElement?.getAttribute("href") ?? "/";

const { app, router } = createApp({ isBrowser: true, basePath });

await router.isReady();

app.mount("#root");
