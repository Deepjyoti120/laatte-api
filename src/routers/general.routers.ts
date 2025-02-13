import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/global.middleware";
import { GeneralController } from "../controllers/general.controller";
import { upload } from "../middlewares/upload.middleware";
export class GeneralRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/basic-info', GlobalMiddleWare.authenticate, GeneralController.basicInfo);
        this.router.get('/role-permissions', GlobalMiddleWare.authenticate, GeneralController.rolePermissions);
    }
    postRoutes() {
        // this.router.post('/add-module', UserValidators.signUp(), GlobalMiddleWare.checkError, UserController.signUp);
    }
    patchRoutes() {
        this.router.patch('/profile-photo-update', GlobalMiddleWare.authenticate, upload.single('photo'),
            GeneralController.profilePhotoUpdate);
    }
    deleteRoutes() {

    }
}
export default new GeneralRouter().router;