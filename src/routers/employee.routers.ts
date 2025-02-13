import { Router } from "express";
import { GlobalMiddleWare } from "../middlewares/global.middleware";
import { EmployeeController } from "../controllers/employee.controller";
import { UserValidators } from "../validators/usersValidators";
import { EmployeeValidators } from "../validators/employee.validators";
export class EmployeeRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/employees',  GlobalMiddleWare.authenticate, EmployeeController.employees);
        this.router.get('/employees/search',  GlobalMiddleWare.authenticate, EmployeeController.searchEmployees);
    }
    postRoutes() {
        this.router.post('/add', EmployeeValidators.add(),GlobalMiddleWare.checkError, EmployeeController.add);
    }
    patchRoutes() {
    }
    deleteRoutes() {

    }
}
export default new EmployeeRouter().router;