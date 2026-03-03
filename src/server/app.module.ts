import { Module } from "@nestjs/common";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";
import { SsrModule } from "./modules/ssr/ssr.module";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

@Module({
    imports: [
        DatabaseModule.forRoot(),

        // Import feature modules here
        TodoModule,

        // SSR module should be the last one to be imported, as it has a wildcard route that matches all requests
        SsrModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule { }
