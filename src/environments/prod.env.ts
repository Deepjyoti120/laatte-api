import { DataSource } from "typeorm";
import { Environment } from "./env";
import { User } from "../models/user.entity";
import { Salary } from "../models/Salary";
import { GeneratedSalary } from "../models/GeneratedSalary";
import * as dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
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
  s3: new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  }),
};
