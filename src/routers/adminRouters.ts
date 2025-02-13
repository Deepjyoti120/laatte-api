import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { body } from 'express-validator';
import { UserValidators } from "../validators/usersValidators";
import { GlobalMiddleWare } from "../middlewares/global.middleware";

export class AdminRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/login', UserValidators.login(),GlobalMiddleWare.checkError, UserController.login);
        this.router.get('/profile',  GlobalMiddleWare.authenticate, UserController.profile);
    }
    postRoutes() {
        this.router.post('/signup', UserValidators.signUp(),GlobalMiddleWare.checkError, UserController.signUp);
    }
    patchRoutes() {
        this.router.post('/verify', UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.verify);
    }
    deleteRoutes() {

    }
}
export default new AdminRouter().router;