import { Repository } from "typeorm";
import { ToDoEntity } from "./todo.entity";

export class ToDoService {
    constructor(
        private readonly todoRepository: Repository<ToDoEntity>
    ) {}

    async getAll() {
    }
}