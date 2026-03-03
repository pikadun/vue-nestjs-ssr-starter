import { createZodDto } from "nestjs-zod";
import { createTodoSchema } from "@shared/schemas/todo.schema";
import { idParamSchema } from "@shared/schemas/base.schema";

export class TodoIdParamDto extends createZodDto(idParamSchema) { }

export class TodoCreateDto extends createZodDto(createTodoSchema) { }
