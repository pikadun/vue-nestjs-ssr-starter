import { createSSRApp } from "vue";
import AppComponent from "./App.vue";
import { createAppRouter, type CreateAppRouterOptions } from "./router";

export type CreateAppOptions = CreateAppRouterOptions;

export const createApp = (options: CreateAppOptions) => {
    const app = createSSRApp(AppComponent);
    const router = createAppRouter(options);

    app.use(router);

    return { app, router };
};
