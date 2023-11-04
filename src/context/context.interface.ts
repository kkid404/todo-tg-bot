import { Context } from "telegraf";
import { ToDoData } from "./todo.interface";

export interface SessionData {
    do: ToDoData;
}

export interface IBotContext extends Context{
    session: SessionData
}