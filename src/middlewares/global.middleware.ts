import { body, validationResult } from "express-validator";
import * as jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from "../environments/env";
export class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            const newError = new Error(error.array()[0].msg)
            return next(newError)
        } else {
            next();
        }
    }
    // static checkError(req, res, next) {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    //     next();
    // }
    //Authenticate start
    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.slice(7, authHeader.lenght) : null;
        try {
            req.errorStatus = 401;
            jwt.verify(token, getEnvironmentVariable().jwt_secret, (err, decoded) => {
                if (err) {
                    next(err);
                } else if (!decoded) {
                    next(new Error('User Not Authorize'));
                } else {
                    req.user = decoded;
                    next();
                }
            })
        } catch (err) {
            next(err);
        }
    }
    //Authenticate end
}