import { DataSource } from "typeorm";
import { Environment } from "./env";
import { User } from "../models/user.entity";
import * as dotenv from "dotenv";
import { S3Client } from "@aws-sdk/client-s3";
import { Photo } from "../models/photo.entity";
import { Prompt } from "../models/prompt.entity";
import { Chat } from "../models/chat.entity";
import { PromptComment } from "../models/prompt_comment.entity";
import { Message } from "../models/message.entity";
dotenv.config();
export const ProdEnvironment: Environment = {
  db: new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "laatte",
    synchronize: false,
    logging: true,
    entities: [
      User,
      Photo,
      Prompt,
      PromptComment,
      Chat,
      Message,
    ],
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
