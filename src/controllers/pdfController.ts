import { PdfServices } from "../services/PdfServices";
import { google, CalendarEvent } from "calendar-link";
export class PdfController {
    static async createPdf(req: any, res: any, next: any) {
        const generatePDF = await PdfServices.generatePDFA4(req, res, next);
        const pdf = Buffer.from(generatePDF);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Analytics.pdf');
        res.setHeader('Content-Disposition', 'inline; filename=Analytics.pdf');
        res.send(pdf);
        // console.log('pdf', pdf); 
    }

    //    create an api to received unit8list
    static async createPdfFromUnit8List(req: any, res: any, next: any) {
        
        console.log('createPdfFromUnit8List', req.body);
        const unit8List = req.body.pdf;
        const pdf = Buffer.from(unit8List);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Analytics.pdf');
        res.setHeader('Content-Disposition', 'inline; filename=Analytics.pdf');
        res.send(pdf);
        console.log('createPdfFromUnit8List', pdf);
        //demo unit8list data for post man in body

    }
    static async generateLink(req: any, res: any, next: any)  {
        const event: CalendarEvent =  {
            title: "Sumato anniversary",
            description: "Hey its anniversary Time",
            start: "2025-8-14 00:00:00 +0100",
            duration: [6, "hour"],
          };
          try {
            const link = google(event);
            res.send(link);
        } catch (error) {
            res.status(500).send("Error generating calendar link");
        }
    }


}