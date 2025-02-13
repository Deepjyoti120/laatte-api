import { DataSource } from "typeorm";
import { DevEnvironment } from "./dev.env";
import { ProdEnvironment } from "./prod.env";
import { SeederOptions } from "typeorm-extension";

export interface Environment {
    db: DataSource & SeederOptions,
    jwt_secret: string
}

export function getEnvironmentVariable() {
    const env = process.env.NODE_ENV || 'development';
    console.log('env->', process.env.DB_PASSWORD);
    if (env === 'production') {
        return ProdEnvironment;
    }
    return DevEnvironment;
}