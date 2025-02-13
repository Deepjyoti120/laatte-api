// from admin router create here excel router
import { Router } from "express";
import { body } from 'express-validator';
import { ExcelRead } from "../shared/utils/ExcelRead";

export class ExcelRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/excel',);
    }
    postRoutes() {
        this.router.post('/excelBody', ExcelRead.readExcelFile);
    }
    patchRoutes() {

    }
    deleteRoutes() {

    }
}
export default new ExcelRouter().router;