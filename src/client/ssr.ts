import { createSSRApp } from "vue";
import { Config as PrimeVue } from "primevue";
import Aura from "@primeuix/themes/aura";
import AppComponent from "./App.vue";
import { createAppRouter, type CreateAppRouterOptions } from "./router";

export type CreateAppOptions = CreateAppRouterOptions;

export const createApp = (options: CreateAppOptions) => {
    const app = createSSRApp(AppComponent);
    const router = createAppRouter(options);

    app.use(router);
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
        },
    });

    return { app, router };
};
