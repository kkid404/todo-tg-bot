import { Repository } from "typeorm";
import { ToDoEntity } from "./todo.entity";
import { UserEntity } from "./user.entity";

export class ToDoService {
    constructor(
        private readonly todoRepository: Repository<ToDoEntity>
    ) {}

    async addToDo(
        name: string, 
        user: UserEntity, 
        date: Date, 
        state: boolean = false) {
            const todo = await this.todoRepository.create({ 
                name,
                user,
                date,
                state
            })
            await this.todoRepository.save(todo);
    }
}