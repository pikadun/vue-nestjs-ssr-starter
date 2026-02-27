import { Injectable } from "@nestjs/common";
import { renderToString } from "vue/server-renderer";
import { config } from "../../config";
import { createApp } from "@client/ssr";
import { RouteName } from "@shared/constant";
import path from "node:path";
import { HTML_PLACEHOLDER_BASE, HTML_PLACEHOLDER_CONTENT } from "../../constant";

@Injectable()
export class SsrService {
    async render(template: string, url: string) {
        const { app, router } = createApp({ basePath: config.basePath });
        const location = router.resolve(url);

        if (location.name === RouteName.CatchAll) {
            return null;
        }
        await router.push(url);
        await router.isReady();

        const content = await renderToString(app);

        const renderData: Record<string, string> = {
            [HTML_PLACEHOLDER_BASE]: `<base href="${path.join(config.basePath, "/")}">`,
            [HTML_PLACEHOLDER_CONTENT]: content,
        };
        return template.replace(/<!--(\w+)-->/g, (_, key: string) => renderData[key] ?? "");
    }
}
