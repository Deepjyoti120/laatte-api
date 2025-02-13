import { body } from "express-validator";
import { User } from "../models/user.entity";

export class EmployeeValidators {
    static add() {
        return [
            body('email', 'email is Required').custom((email, { req }) => {
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
        ]
    }

}