import { DataSource } from "typeorm";

export const dataSource = new DataSource({
    type:"postgres",
    host: "db",
    username: "admin",
    password: "devpass",
    database: "the-good-corner",
    entities: ["src/entities/*.ts"],
    synchronize: true,
    logging: ["error", "query"],
})

