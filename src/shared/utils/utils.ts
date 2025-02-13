import * as Bcrypt from 'bcrypt';
export class Utils {
    static generateVerificationToken(size: number = 6) {
        let digit = '1234567890';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digit[Math.floor(Math.random() * 10)];

        }
        return parseInt(otp);
    }
    public MAX_TOKEN_TIME = 60000;
    // password encrypt & Compare start
    static encryptPassword(password: string): Promise<any> {
        return new Promise(((resolved, reject) => {
            Bcrypt.hash(password, 10, (async (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolved(hash);
                }
            }))
        }))
    }
    static async comparePassword(password: { plainPassword: string, encryptPassword: string }):
        Promise<any> {
            return new Promise(((resolved, reject) => {
                Bcrypt.compare(password.plainPassword, password.encryptPassword, ((err, isValid) => {
                    if (err) {
                        reject(err);
                    } else if (!isValid) {
                        reject(new Error('Email and Password does not exists'));
                    } else {
                      resolved(true);
                    }
                }))
            }))
    }
    // password encrypt & Compare end
}