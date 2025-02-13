// import User from "../models/User";
import { body, validationResult } from "express-validator";
import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from "../environments/env";
import { User } from "../models/user.entity";
import { env } from "process";
import { FinancialDetail } from "../models/FinancialDetail";
import ResponseHelper from "../services/ResponseHelper";
import { Utils } from "../shared/utils/utils";
export class UserController {
    static async signUp(req, res, next) {
        const error = validationResult(req);
        const userbody = req.body as User;
        if (!error.isEmpty()) {
            const newError = new Error(error.array()[0].msg)
            return next(newError);
        }
        try {
            const hash = await Utils.encryptPassword(userbody.password);
            const user = new User();
            user.email = userbody.email;
            user.username = userbody.username;
            user.password = hash;
            user.role = userbody.role;
            user.is_active = true;
            user.profile_picture = userbody.profile_picture;
            user.cover_picture = userbody.cover_picture;
            user.bio = userbody.bio;
            user.assign_to = userbody.assign_to;
            user.first_name = userbody.first_name;
            user.middle_name = userbody.middle_name;
            user.last_name = userbody.last_name;
            user.name = userbody.name;
            user.is_verified = false;
            // user.verification_token = Utils.generateVerificationToken();
            // user.verification_token_time = Date.now() + new Utils().MAX_TOKEN_TIME;
            user.phone = userbody.phone;
            user.designation = userbody.designation;
            user.department = userbody.department;
            user.dob = userbody.dob;
            user.gender = userbody.gender;
            user.doj = userbody.doj;
            user.address = userbody.address;
            user.pincode = userbody.pincode;
            user.city = userbody.city;
            user.state = userbody.state;
            user.country = userbody.country;
            await user.save();
            return ResponseHelper.created(res, user);
        } catch (e) {
            next(e);
        }
    }
    // static login(req, res, next) {
    //     const error = validationResult(req);
    //     const username = req.body.username;
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     if (!error.isEmpty()) {
    //         const newError = new Error(error.array()[0].msg)
    //         next(newError)
    //     }
    //     //New Update
    //     // const user = new User({
    //     //     email:email,
    //     //     password:password
    //     // });
    //     // user.save().then((user)=>{
    //     //     res.send(user);
    //     // }).catch(err=>{
    //     //     // const error = new Error(err);
    //     //     next(err);
    //     // })
    //     //New Update
    // }
    static async verify(req, res, next) {
        const verificationtoken = req.body.verification_token;
        const email = req.body.email;
        try {
            // let user = await new User(data).save();
            // res.send(user);
            // const user = await User.findOneAndUpdate({
            //     email: email, verification_token: verificationtoken,
            //     verification_token_time: { $gt: Date.now() }
            // }, {
            //     verified: true
            // }, {
            //     new: true
            // });
            // if (user) {
            //     const newError = new Error('Verifuication Token Expired please request for new one')
            //     next(newError)
            // }
        } catch (e) {
            next(e);
        }
    }
    static async login(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const user = req.user as User;
        try {
            await Utils.comparePassword({ plainPassword: password, encryptPassword: user.password });
            const data = {
                id: user.id,
                email: user.email,
            };
            const token = jwt.sign(data, getEnvironmentVariable().jwt_secret, { expiresIn: '120d' });
            const jsonData = { token: token, user: user };
            // res.json(jsonData);
            return ResponseHelper.success(res, jsonData);
        } catch (e) {
            next(e);
        }
    }
    static async profile(req, res, next) {
        const userdata = req.user as User;
        try {
            console.log('userdata', userdata.id);
            const user = await User.findOne({
                where: { email: userdata.email, id: userdata.id },
                // relations: ['financial_detail','assign_to']
            });
            if (user) {
                return ResponseHelper.success(res, user);
            }
            const newError = new Error('User Not Found')
            return next(newError)
        } catch (e) {
            next(e);
        }
    }
    static async forgotPassword(req, res, next) {
        const email = req.body.email;
        try {
            const user = await User.findOne({ where: { email } });
            if (user) { 
                return res.json(user);
            }
        } catch (e) {
            next(e);
        }
    }
    
    static async resetPassword(req, res, next) {
        const password = req.body.password;
        const email = req.body.email;
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                return res.json(user);
            }
        } catch (e) {
            next(e);
        }
    }
    static async addFinancialDetail(req, res, next) {
        const user = req.user as User;
        const financialBody = req.body;
        try {
            if (user) { 
                const financialDetail = new FinancialDetail();
                financialDetail.bank_name = financialBody.bank_name;
                financialDetail.bank_account_number = financialBody.bank_account_number;
                financialDetail.bank_account_name = financialBody.bank_account_name;
                financialDetail.user = financialBody.user;
                financialDetail.created_by = user;
                await financialDetail.save();
                return res.json(financialDetail);
            }
        } catch (e) {
            next(e);
        }
    }
}