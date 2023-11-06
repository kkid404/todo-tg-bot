import { Context } from "telegraf";
import { ToDoData } from "./todo.interface";

export interface SessionData {
    do: ToDoData;
    lang: string;
}

export interface IBotContext extends Context{
    session: SessionData
}