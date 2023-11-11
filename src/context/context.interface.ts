import { Context } from "telegraf";
import { ToDoData } from "./todo.interface";

export interface SessionData {
    state: 'add' | 'delete' | 'edit' | 'check' | undefined;
    do: ToDoData;
}

export interface IBotContext extends Context{
    session: SessionData
}