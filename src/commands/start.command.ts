import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";
import * as ruMessages from "../lang/ru.json";
import * as enMessages from "../lang/en.json";
import { Lang } from "../lang/lang.interface";
import { start } from "../keyboards/start.keyboard";
import { UserService } from "../data/user.service";




export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, private readonly userService: UserService) {
        super(bot)
    }

    handle(): void {
        this.bot.start( async (ctx) => {
            const userLanguage = ctx.from.language_code || "ru";
            const messages: Lang = userLanguage === "ru" ? ruMessages : enMessages;
            
            if(!await this.userService.getByTgId(ctx.from.id)) {
                await this.userService.add(ctx.from.id, userLanguage, ctx.from.first_name)
            }

            await ctx.sendMessage(
                `${messages.message.start} ${ctx.from.first_name}!`,
                start(userLanguage)
            )
        } )
    }
}