import { writeFileSync } from 'fs';
import * as XLSX from 'xlsx';
import axios from 'axios';
export class ApiAccess {
    static async getExelFromLink(urlString: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(urlString, { responseType: 'arraybuffer' });
                const excelPath = 'temp.xlsx';
                writeFileSync(excelPath, Buffer.from(response.data), 'binary');
                resolve(excelPath);
            } catch (err) {
                reject(err);
            }
        })
    }
}