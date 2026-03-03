import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import type { RouteRecordSingleView, Router } from "vue-router";
import { AppRouteName, APP_ROUTES } from "@shared/routes";

const components: Record<AppRouteName, () => Promise<unknown>> = {
    [AppRouteName.Home]: () => import("./views/Homepage.vue"),
    [AppRouteName.Todo]: () => import("./views/Todo.vue"),
    // TODO: add 404 page
    [AppRouteName.CatchAll]: () => Promise.resolve(),
};

const routes = APP_ROUTES.map<RouteRecordSingleView>(route => ({
    path: route.path,
    name: route.name,
    component: components[route.name],
}));

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
