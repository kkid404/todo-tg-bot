import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import * as ruMessages from "../lang/ru.json";
import * as enMessages from "../lang/en.json";
import { Lang } from "../lang/lang.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot)
    }

    handle(): void {
        this.bot.start( async (ctx) => {
            const userLanguage = ctx.from.language_code || "ru";
            console.log(userLanguage);
            const messages: Lang = userLanguage === "ru" ? ruMessages : enMessages;
            await ctx.sendMessage(
                `${messages.message.start} ${ctx.from.first_name}!`
            )
        } )
    }
}