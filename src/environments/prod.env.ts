import { DataSource } from "typeorm";
import { Environment } from "./env";
import { User } from "../models/user.entity";
import { Salary } from "../models/Salary";
import { GeneratedSalary } from "../models/GeneratedSalary";
import * as dotenv from "dotenv";
dotenv.config();
export const ProdEnvironment: Environment = {
  db: new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "laatte",
    synchronize: true,
    logging: true,
    entities: [User, Salary, GeneratedSalary],
    subscribers: [],
    migrations: [],
  }),
  jwt_secret: "prod_secret",
};
