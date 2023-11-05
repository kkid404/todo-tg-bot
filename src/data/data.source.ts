import { DataSource } from "typeorm";
import { ToDoEntity } from "./todo.entity";
import { ConfigService } from "../config/congif.service";

const config = new ConfigService();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.get("HOST"),
    port: Number(config.get("PORT")),
    username: config.get("USERNAME"),
    password: config.get("PASSWORD"),
    database: config.get("DATABASE"),
    synchronize: false,
    logging: true,
    entities: [ToDoEntity],
    subscribers: [],
    migrations: [],
    insecureAuth: true

})