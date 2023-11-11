import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import * as ruMessages from "../lang/ru.json";
import * as enMessages from "../lang/en.json";
import { Lang } from "../lang/lang.interface";
import { UserService } from "../data/user.service";
import { ToDoService } from "../data/todo.service";
import { back, start } from "../keyboards/start.keyboard";




export class ToDoAddCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, private readonly todoService: ToDoService, private readonly userService: UserService) {
        super(bot)
    }

    handle(): void {
        this.bot.on('text', async (ctx) => {
            const userLanguage = ctx.from.language_code || "ru";
            const messages: Lang = userLanguage === "ru" ? ruMessages : enMessages;

            if (ctx.session.state === 'add') {
                const todoText = await ctx.message.text;
                const user = await this.userService.getByTgId(ctx.from.id);
                if(user !== null) {
                    await this.todoService.addToDo(todoText, user, new Date());
                    await ctx.reply(messages.message.save_todo, start(userLanguage));
                } else{
                    await ctx.reply(messages.message.error_save, start(userLanguage))
                }

                ctx.session.state = undefined;
            } else if (ctx.message.text == messages.keyboards.start[0]) {
                await ctx.sendMessage(messages.message.add_todo, back(userLanguage));
                ctx.session.state = 'add';
            }
        })

    }
}