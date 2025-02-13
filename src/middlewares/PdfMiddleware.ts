// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// export class PdfMiddleware {
//     static async generatePDF(req, res, next) {
//         try {

//             const pdfDoc = await PDFDocument.create()
//             const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
//             const page = pdfDoc.addPage()
//             const { width, height } = page.getSize()
//             const fontSize = 30
//             page.drawText('Creating PDFs in JavaScript is awesome!', {
//                 x: 50,
//                 y: height - 4 * fontSize,
//                 size: fontSize,
//                 font: timesRomanFont,
//                 color: rgb(0, 0.53, 0.71),
//             })
//             const pdfBytes = await pdfDoc.save();
//             // console.log("pdfBytes", pdfBytes);
//             // const excelPath = 'temp.pdf';
//             // writeFileSync(excelPath, Buffer.from(pdfBytes), 'binary');
//             // res.setHeader('Content-Type', 'application/pdf');
//             // res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
//             // res.setHeader('Content-Length', pdfBytes.length);
//             // res.send();
//             next(Buffer.from(pdfBytes));
//         } catch (error) {
//             next(error);
//         }
//     }
// }
