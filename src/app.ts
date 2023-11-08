import { Telegraf } from "telegraf";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { IConfigService } from "./config/config.interface";
import LocalSession from "telegraf-session-local";
import { StartCommand } from "./commands/start.command";
import { ConfigService } from "./config/congif.service";
import { AppDataSource } from "./data/data.source";
import { UserEntity } from "./data/user.entity";
import { UserService } from "./data/user.service";


class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(
            (new LocalSession({database: 'session.json'})).middleware()
        );
        // AppDataSource.initialize()
        //     .then(() => {
        //         const repository = AppDataSource.getRepository(UserEntity)
        //         const userService: UserService = new UserService(repository)
        //     })
        //     .catch((error) => console.log(error))
        
    }

    async init() {
        await AppDataSource.initialize();

        const repository = AppDataSource.getRepository(UserEntity);
        const userService = new UserService(repository);
        this.commands = [new StartCommand(this.bot, userService)];

        for(const command of this.commands) {
            command.handle();
        }

        this.bot.launch();
        console.log('Bot has started!');
    }
}

const bot = new Bot(new ConfigService());
bot.init();

