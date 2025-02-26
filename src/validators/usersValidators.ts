import { body, query } from "express-validator";
import { DataSource, getRepository } from 'typeorm';
import { User } from "../models/user.entity";
import { FinancialDetail } from "../models/FinancialDetail";

export class UserValidators {
    // static login() {
    //     return [body('username', ('username is Required')).isString(),
    //     body('email', ('email is Required')).isString(),
    //     body('password').custom((req)=>{
    //         if(req.email){
    //             return true
    //         }else {
    //             throw new Error('Testing Custom validation');
    //         }
    //     })]
    // }
    static signUp() {
        return [
            body('email', 'email is Required').custom((email, { req }) => {
                console.log(req.body);
                return User.findOne({ where: { email } }).then(user => {
                    if (user) {
                        throw new Error('User Already Exist');
                    } else {
                        return true;
                    }
                });
            }
            ),
            body('username', 'username is Required')
                .isString()
                .isLength({ min: 3, max: 20 })
                .withMessage('Username must be between 3 and 20 characters')
                .matches(/^[a-zA-Z0-9_]+$/)
                .withMessage('Username can only contain letters, numbers, and underscores')
                .custom(username => {
                    if (/\s/.test(username)) {
                        throw new Error('Username must not contain spaces');
                    }
                    return true;
                }),
            body('password', 'password is Required').isString().isLength({ min: 8, max: 20 }).withMessage('Password much be between min 8 and max 20')
        ]
    }
    static verifyUser() {
        return [body('verification_token', 'verification_token is required').isNumeric(),
        body('email', 'email is Required').isEmail()
        ];
    }

    //Login Validator start
    static login() {
        return [
            body('email', 'Email is required').isEmail().custom(async (email, { req }) => {
                const user = await User.findOne({ where: { email } });
                console.log(email)
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User Does Not Exist');
                }
            }),
            body('password', 'Password is required').isString().isLength({ min: 8, max: 20 })
                .withMessage('Password must be between 8 and 20 characters')
        ];
    }
    //Login Validator end

    static forgotPassword() {
        return [body('email', 'Email is required').isEmail()];
    }
    static resetPassword() {
        return [body('password', 'Password is required').isString().isLength({ min: 8, max: 20 })
            .withMessage('Password must be between 8 and 20 characters')];
    }

    static financialDetail() {
        return [
            body('bank_name', 'bank_name is Required').isString(),
            body('bank_account_number', 'bank_account_number is Required').isNumeric(),
            body('bank_account_name', 'bank_account_name is Required').isString(),
            body('user', 'Employee id is required').isUUID().custom((userId, { req }) => {
                return FinancialDetail.findOne({ where: { user: { id: userId } } }).then(fd => {
                    if (fd) {
                        throw new Error('Financial Detail Already Exist');
                    } else {
                        return true;
                    }
                });
            }
            ),
        ]
    }
    static otpRequest() {
        return [
            body('phone', 'Phone Number is required').isString().custom(async (phone, { req }) => {
                let user = await User.findOne({ where: { phone } });
                if (!user) {
                    user = await User.create({ phone });
                }
                req.user = user;
                return true;
            }),
        ];
    }

    static otp() {
        return [
            body('phone', 'Phone Number is required').isString().custom(async (phone, { req }) => {
                const user = await User.findOne({ where: { phone } });
                if (user) {
                    req.user = user;
                    return true;
                } else {
                    throw new Error('User Does Not Exist');
                }
            }),
            body('otp', 'otp is required').isNumeric().isLength({ min: 6, max: 6 })
                .withMessage('otp must be 6 characters')
        ];
    }

    static location() {
        return [
            body('latitude', 'latitude is Required').isNumeric(),
            body('longitude', 'longitude is Required').isNumeric(),
        ];
    }
    static profileUpdate() {
        return [
            body('name', 'Please enter your name').isNumeric(),
            body('occupation', 'Please enter your occupation').isNumeric(),
            body('education', 'Please enter your education').isNumeric(),
            body('bio', 'Please enter your bio').isNumeric(),
            body('photos', 'Please add atleast 2 photos')
                .optional()
                .isArray({min: 2})
                .custom((value) => value.every((photo) => typeof photo === 'string')),
        ];
    }
    static addPrompt() {
        return [
            body('name', 'Please enter your name').isNumeric(),
        ];
    }
    static addPromptComment() {
        return [
            body('name', 'Please enter your name').isNumeric(),
        ];
    }

}