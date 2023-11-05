import { Telegraf } from "telegraf";
import { IBotContext } from "./context/context.interface";
import { Command } from "./commands/command.class";
import { IConfigService } from "./config/config.interface";
import LocalSession from "telegraf-session-local";
import { StartCommand } from "./commands/start.command";
import { ConfigService } from "./config/congif.service";
import { AppDataSource } from "./data/data.source";


class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
        this.bot.use(
            (new LocalSession({database: 'session.json'})).middleware()
        );
        AppDataSource.initialize()
            .then(() => {
                
            })
            .catch((error) => console.log(error))
        
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


// Database Configuration
// To set up the database connection, create an ormconfig.json file in the root directory of your project. Here's an example configuration:

// json
// Copy code
// {
//   "type": "mysql",
//   "host": "localhost",
//   "port": 3306,
//   "username": "your_username",
//   "password": "your_password",
//   "database": "your_database_name",
//   "entities": ["src/entities/*.ts"],
//   "migrations": ["src/migrations/*.ts"]
// }
// Replace the values for your_username, your_password, and your_database_name with the appropriate parameters for your MySQL database. You can also configure the paths for entities (entities) and migrations (migrations) based on your project's structure.