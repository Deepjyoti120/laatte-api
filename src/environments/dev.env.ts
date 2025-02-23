import { DataSource } from "typeorm";
import { Environment } from "./env";
import { User } from "../models/user.entity";
import { Salary } from "../models/Salary";
import { GeneratedSalary } from "../models/GeneratedSalary";
import { Document } from "../models/Document";
import { Attendance } from "../models/Attendance";
import { Shift } from "../models/Shift";
import { FinancialDetail } from "../models/FinancialDetail";
import * as dotenv from "dotenv";
import { RolePermission } from "../models/role-permissions.entity";
import { Feature } from "../models/feature.entity";
import { Module } from "../models/module.entity";
import { Department } from "../models/department.entity";
import { Designation } from "../models/designation.entity";
import { Country } from "../models/Country.entity";
import { State } from "../models/State.entity";
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config();
export const DevEnvironment: Environment = {
  db: new DataSource({
    type: process.env.DB_TYPE as "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    // logging: true,
    logging: ['error'],
    logger: "file",
    entities: [
      User,
      Salary,
      GeneratedSalary,
      Document,
      Shift,
      Attendance,
      FinancialDetail,
      RolePermission,
      Module,
      Feature,
      Department,
      Designation,
      Country,
      State,
    ],
    subscribers: [],
    migrations: [],
  }),
  jwt_secret: "dev_secret",
  s3: new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  }),
};
