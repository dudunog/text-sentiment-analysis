import path from "path";
import { DataSource } from "typeorm";
import { Environment } from "../environment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: Environment.infrastructure.database.postgresql.host,
  port: Number(Environment.infrastructure.database.postgresql.port),
  username: Environment.infrastructure.database.postgresql.user,
  password: Environment.infrastructure.database.postgresql.password,
  database: Environment.infrastructure.database.postgresql.database,
  entities: [
    `${path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "contexts",
      "**",
      "external",
      "entities",
      "*.{ts,js}",
    )}`,
  ],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});
