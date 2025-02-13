import * as express from 'express';
import { getEnvironmentVariable } from './environments/env';
import UserRouter from './routers/users.routers';
import * as bodyParser from 'body-parser';
import EmployeeRouter from './routers/employee.routers';
import  GeneralRouter from './routers/general.routers';
import * as multer from 'multer';
import { Constants } from './shared/constants';
import * as path from 'path';
import { createServer, Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";


export class Server {
    public app: express.Application = express();
    pool: any;
    private io: SocketIOServer;
    public upload: multer.Multer; 
    public server: HttpServer;
    constructor() {
        this.server = createServer(this.app);
        this.io = new SocketIOServer(this.server, {
            cors: { origin: "*" },
        });
        this.setConfigaration();
        this.setRoutes();
        this.setupWebSocket();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigaration() {
        this.connectPostgresql();
        this.configureBodyParser();
        this.configureCors();
        this.upload = this.configureMulter();
    }
    connectPostgresql() {
        const env = getEnvironmentVariable();
        env.db.initialize()
        .then(() => {
            console.log('PG Connected');
        })
    .catch((error) => console.log(error))
    }

    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    configureCors() {
        this.app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }
    configureMulter() {
        return multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "uploads/");
                },
                filename: (req, file, cb) => {
                    cb(null, `${Date.now()}-${file.originalname}`);
                },
            }),
            limits: { fileSize: Constants.MAX_FILE_SIZE },
        });
    }
    setRoutes() {
        this.app.use('/uploads', express.static(path.resolve('uploads')));
        this.app.use('/v1/api', GeneralRouter);
        this.app.use('/v1/api/user', UserRouter);
        this.app.use('/v1/api/employee', EmployeeRouter);
        // this.app.use('/api/admin', AdminRouter);
        // this.app.use('/api/excel', ExcelRouter);
        // this.app.use('/api/pdf', PDFRouter);
    }
    setupWebSocket() {
        this.io.on("connection", (socket) => {
            console.log("New WebSocket connection:", socket.id);
            socket.on("message", (data) => {
                console.log("Received:", data);
                socket.broadcast.emit("message", data);
            });
            socket.on("disconnect", () => {
                console.log("User disconnected:", socket.id);
            });
        });
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                // status_code: 404,
                status: false
            })
        })
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong, Please try again',
                // status_code: errorStatus
                status: false
            })
        })
    }
}