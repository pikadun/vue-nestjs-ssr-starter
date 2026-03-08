import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoPageController } from "./controllers/todo-page.controller";
import { TodoService } from "./todo.service";
import { TodoModel } from "./todo.model";
import { DatabaseModule } from "../../core/database/database.module";

@Module({
    imports: [DatabaseModule.forFeature(TodoModel)],
    controllers: [TodoPageController, TodoController],
    providers: [TodoService],
})
export class TodoModule { }
