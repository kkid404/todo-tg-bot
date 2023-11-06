import { DataSource } from "typeorm";
import { ToDoEntity } from "./todo.entity";
import { ConfigService } from "../config/congif.service";
import { UserEntity } from "./user.entity";

const config = new ConfigService();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.get("HOST"),
    port: Number(config.get("PORT")),
    username: config.get("USERNAME"),
    password: config.get("PASSWORD"),
    database: config.get("DATABASE"),
    synchronize: true,
    logging: true,
    entities: [ToDoEntity, UserEntity],
    subscribers: [],
    migrations: [],
    insecureAuth: true

})