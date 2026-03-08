import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import type { RouteRecordRaw, Router } from "vue-router";
import { AppRouteName, APP_ROUTES } from "@shared/routes";

const componentMap: Record<Exclude<AppRouteName, AppRouteName.CatchAll>, () => Promise<unknown>> = {
    [AppRouteName.Home]: () => import("./views/Homepage.vue"),
    [AppRouteName.Todo]: () => import("./views/Todo.vue"),
};

const routes = APP_ROUTES.map<RouteRecordRaw>((route) => {
    return route.name === AppRouteName.CatchAll
        ? { ...route, redirect: { name: AppRouteName.Home } }
        : { ...route, component: componentMap[route.name] };
});

export interface CreateAppRouterOptions {
    isBrowser?: boolean;
    basePath?: string;
}

export const createAppRouter = (options: CreateAppRouterOptions): Router => {
    const history = options.isBrowser
        ? createWebHistory(options.basePath)
        : createMemoryHistory(options.basePath);

    return createRouter({
        history,
        routes,
    });
};
