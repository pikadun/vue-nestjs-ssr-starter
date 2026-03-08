import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { DatabaseModule } from "./core/database/database.module";
import { TodoModule } from "./modules/todo/todo.module";
import { AppController } from "./app.controller";

@Module({
    imports: [
        DatabaseModule.forRoot(),

        // Import feature modules here
        TodoModule,
    ],
    // AppController has a wildcard route, so it must be registered last
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
    ],
})
export class AppModule {}
