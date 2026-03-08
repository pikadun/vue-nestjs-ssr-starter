import {
    Injectable,
    NotFoundException,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
    type OnModuleInit,
} from "@nestjs/common";
import { renderToString } from "vue/server-renderer";
import { switchMap } from "rxjs";
import type { FastifyRequest, FastifyReply } from "fastify";
import path from "node:path";
import fs from "node:fs/promises";
import { config } from "../../config";
import { createApp } from "@client/ssr";
import { AppRouteName } from "@shared/routes";
import { stripBasePath } from "../../utils/url";
import {
    CLIENT_ENTRY_NAME,
    CLIENT_ENVIRONMENT_NAME,
    HTML_PLACEHOLDER_BASE,
    HTML_PLACEHOLDER_CONTENT,
} from "../../constant";

@Injectable()
export class SsrInterceptor implements NestInterceptor, OnModuleInit {
    #template!: string;

    async onModuleInit() {
        if (!global.devServer) {
            const templatePath = path.join(import.meta.dirname, "index.html");
            this.#template = await fs.readFile(templatePath, "utf-8");
        }
    }

    private async getTemplate(): Promise<string> {
        if (global.devServer) {
            return global.devServer.environments[CLIENT_ENVIRONMENT_NAME]?.getTransformedHtml(CLIENT_ENTRY_NAME) ?? "";
        }
        return this.#template;
    }

    private async render(url: string) {
        const template = await this.getTemplate();
        const { app, router } = createApp({ basePath: config.basePath });
        const location = router.resolve(url);

        if (location.name === AppRouteName.CatchAll) {
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

    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            switchMap(async () => {
                const req = context.switchToHttp().getRequest<FastifyRequest>();
                const res = context.switchToHttp().getResponse<FastifyReply>();
                const url = stripBasePath(req.url);
                const html = await this.render(url);

                if (html) {
                    res.type("text/html").send(html);
                }
                else if (global.devServer) {
                    Object.assign(req.raw, { body: req.body, url });

                    await new Promise<void>((_resolve, reject) => {
                        global.devServer?.middlewares(req.raw, res.raw, () => {
                            reject(new NotFoundException());
                        });
                    });
                }
                else {
                    throw new NotFoundException();
                }
            }),
        );
    }
}
