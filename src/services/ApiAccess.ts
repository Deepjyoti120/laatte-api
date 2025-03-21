import { writeFileSync } from 'fs';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { Twilio } from 'twilio/lib';
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
    static async sendSms(to: string, message: string): Promise<any> {
        try {
            const accountSid = 'AC50f2efd997f6e0d1011221952c0328a8';
            const authToken = '4c5e1ee8cfe79b49bfcedfcdf6b1246a';
            // const serviceId = 'VAe1de93e267dbff570c165a386bec645c';
            const client = new Twilio(accountSid, authToken);
            const response = await client.messages.create({
                from: "+15124026763",
                to: to,
                body: message,
            });
            return response;
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw error;
        }
    }

}


// curl 'https://api.twilio.com/2010-04-01/Accounts/AC50f2efd997f6e0d1011221952c0328a8/Messages.json' -X POST \
// --data-urlencode 'To=+918399077606' \
// --data-urlencode 'From=+15124026763' \
// --data-urlencode 'Body=hf' \
// -u AC50f2efd997f6e0d1011221952c0328a8:4c5e1ee8cfe79b49bfcedfcdf6b1246a
