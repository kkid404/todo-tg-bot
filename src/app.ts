import { Telegraf } from "telegraf";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { IConfigService } from "./config/config.interface";
import LocalSession from "telegraf-session-local";
import { StartCommand } from "./commands/start.command";
import { ConfigService } from "./config/congif.service";


class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(
            (new LocalSession({database: 'session.json'})).middleware()
        );
    }

    init() {
        this.commands = [new StartCommand(this.bot)];

        for(const command of this.commands) {
            command.handle();
        }

        this.bot.launch();
        console.log('Bot has started!');
    }
}

const bot = new Bot(new ConfigService());
bot.init();