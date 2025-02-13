import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
const green = rgb(0.61, 0.9, 0.82);
const lightGreen = rgb(0.80, 0.94, 0.91);
const sep = 120.0;
export class PdfServices {
    // Uint8Array return type create function
    static async generatePDFA4(req, res, next) {
        return Promise.all([
            await PDFDocument.create(),
            StandardFonts.HelveticaBold,

        ]).then(async ([pdfDoc, helvetica]) => {
            const helveticaFont = await pdfDoc.embedFont(helvetica);
            const page = pdfDoc.addPage();
            const pageWidth =595;
            const pageHeight = 842;
            page.setSize(pageWidth, pageHeight);
            const { width, height } = page.getSize();
            const fontTitle = 30;
            const fontMediumText = 25;
            const title = 'DSZ PDF Analytics';
            const titleWidth = helveticaFont.widthOfTextAtSize(title, fontTitle);
            page.drawText(title, {
                x: (width - titleWidth) / 2,
                y: height - 50,
                size: fontTitle,
                font: helveticaFont,
                color: rgb(0, 0.53, 0.71),
            });

            // Add 3 circles with center text "33"
            const circleSize = 40;
            const circleSpacing = 50;
            const fontSize = 14;

            // Calculate the total width of the row
            // const pngUrl = 'https://pdf-lib.js.org/assets/minions_banana_alpha.png'
            // const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer())
            // const pngImage = await pdfDoc.embedPng(pngImageBytes)
            
            // Add your content to the page using pdf-lib APIs
            page.drawText('Your Text Here', { x: 50, y: 500 });
        
            // Example usage of online image
            // const pngDims = pngImage.scale(0.5)
            // page.drawImage(pngImage, {
            //     x:pageWidth / 2 - pngDims.width / 2 + 75,
            //     y: pageHeight / 2 - pngDims.height + 250,
            //     width: pngDims.width,
            //     height: pngDims.height,
            //   })
        
            // End edit
            const pdfBytes = await pdfDoc.save()
            return pdfBytes;
        })
    }
    // create another with promise

}
