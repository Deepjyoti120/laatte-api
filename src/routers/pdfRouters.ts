// from admin router create here excel router
import { Router } from "express";
import { body } from 'express-validator';
import { PdfController } from "../controllers/pdfController";

export class PDFRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/pdf', PdfController.createPdf);//http://localhost:5001/api/pdf/pdf
    }
    postRoutes() {
        this.router.post('/createPDF', PdfController.createPdfFromUnit8List); //http://localhost:5001/api/pdf/createPDF
        this.router.post('/generateLink', PdfController.generateLink); //http://localhost:5001/api/pdf/createPDF
    }
    patchRoutes() {

    }
    deleteRoutes() {

    }
}
export default new PDFRouter().router;