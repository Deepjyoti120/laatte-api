import { In, Like, Not } from "typeorm";
import { User } from "../models/user.entity";
import { Request, Response, NextFunction } from "express";
import ResponseHelper from "../services/ResponseHelper";
import { validationResult } from "express-validator";
import { Utils } from "../shared/utils/utils";
import { Constants } from "../shared/constants";

export class EmployeeController {
    static async employees(req: Request, res: Response, next: NextFunction) {
        const { page = 1, limit = 10 } = req.query;
        try {
            const [users, total] = await User.findAndCount({
                where: {
                    // role: Not(In(RolesArray)), // will be added later
                    is_active: true,
                },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                cache: { id: 'user_cache', milliseconds: 12 },
            });
            // const customUsers = users.map(user => {
            //     if (!user.profile_picture) {
            //         return {
            //             ...user,
            //             profile_picture: `https://yourdomain.com/profiles/create/${user.id}`,
            //         };
            //     }
            //     return user;
            // });
            return ResponseHelper.pagination(
                res,
                users,
                Number(page),
                Number(limit),
                total
            );
        } catch (e) {
            next(e);
        }
    }
    static async searchEmployees(req: Request, res: Response, next: NextFunction) {
        const { search = "", page = 1, limit = 10 } = req.query;
        try {
            const users = await User.find({
                where: [
                    { is_active: true, name: Like(`%${search}%`) },
                    { is_active: true, email: Like(`%${search}%`) },
                    { is_active: true, phone: Like(`%${search}%`) },
                    { is_active: true, username: Like(`%${search}%`) },
                    { is_active: true, designation: Like(`%${search}%`) },
                ],
                cache: { id: 'user_search_cache', milliseconds: 60000 },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
            });
            return ResponseHelper.pagination(
                res,
                users,
                Number(page),
                Number(limit),
                users.length
            );
        } catch (e) {
            next(e);
        }
    }
    static async add(req, res, next) {
        const error = validationResult(req);
        const userbody = req.body as User;
        if (!error.isEmpty()) {
            const newError = new Error(error.array()[0].msg)
            return next(newError);
        }
        try {
            const hash = await Utils.encryptPassword(userbody.password || Constants.DEFAULT_PASSWORD);
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
}
