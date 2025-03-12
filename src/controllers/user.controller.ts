// import User from "../models/User";
import { body, validationResult } from "express-validator";
import * as Bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getEnvironmentVariable } from "../environments/env";
import { User } from "../models/user.entity";
import { env } from "process";
import ResponseHelper from "../services/ResponseHelper";
import { Utils } from "../shared/utils/utils";
import { Photo } from "../models/photo.entity";
import { Prompt } from "../models/prompt.entity";
import { PromptComment } from "../models/prompt_comment.entity";
import { Sequelize } from 'sequelize'; // Import Sequelize

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
            user.dob = userbody.dob;
            user.gender = userbody.gender;
            user.doj = userbody.doj;
            user.address = userbody.address;
            user.pincode = userbody.pincode;
            user.city = userbody.city;
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
    static async updateLocation(req, res, next) {
        const authuser = req.user as User; // Authenticated user
        const { latitude, longitude } = req.body;

        try {
            const data = await User.update(authuser.id,
                { latitude, longitude });
            if (data) {
                return ResponseHelper.success(res, 'Location Updated Successfully');
            }
            return ResponseHelper.error(res, 'User not found', 404);

        } catch (e) {
            next(e);
        }
    }
    // static async updateLocation(req, res, next) {
    //     const authuser = req.user as User; // Authenticated user
    //     const { latitude, longitude } = req.body;
    //     try {
    //         const user = await User.findOne({ where: { id: authuser.id } });
    //         if (!user) {
    //             return ResponseHelper.error(res, 'User not found', 404);
    //         }
    //         user.latitude = latitude;
    //         user.longitude = longitude;
    //         await user.save();

    //         return ResponseHelper.success(res, user);
    //     } catch (e) {
    //         next(e);
    //     }
    // }

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
    static async sentOTP(req, res, next) {
        const phone = req.body.phone;
        const user = req.user as User;
        try {
            const otp = user.phone === '8811890749' || user.phone === '8811890740' ? 123456 : Utils.generateVerificationToken();
            user.otp = otp;
            await user.save();
            return ResponseHelper.success(res, '', 'Otp Sent Successfully');
        } catch (e) {
            next(e);
        }
    }
    static async loginOtp(req, res, next) {
        const body = req.body;
        const otp = req.body.otp as number;
        const user = req.user as User;
        try {
            // user.phone !== phone || 
            if (user.otp !== otp) {
                // return res.status(400).json({ message: 'Invalid phone number or OTP.' });
                return ResponseHelper.validationError(res, 'Invalid OTP.');
            }
            user.otp = null;
            user.device_name = body.device_name;
            user.fcm_token = body.fcm_token;
            await user.save();
            const data = {
                id: user.id,
                email: user.email,
                role: user.role,
                phone: user.phone,
                is_active: user.is_active,
            };
            const token = jwt.sign(data, getEnvironmentVariable().jwt_secret, { expiresIn: '2d' });
            const jsonData = { token: token, user: user };
            return ResponseHelper.success(res, jsonData, 'Successfully Logged In');
        } catch (e) {
            next(e);
        }
    }
    static async uploadProfilePicture(req, res, next) {
        const body = req.body;
        try {
            return ResponseHelper.success(res, body, 'Successfully Logged In');
        } catch (e) {
            console.error("Error in uploadProfilePicture:", e);
            next(e);
        }
    }
    static async updateProfile(req, res, next) {
        const authuser = req.user as User; // Authenticated user
        const body = req.body;
        const queryRunner = getEnvironmentVariable().db.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            const updateData = {
                name: body.name,
                occupation: body.occupation,
                education: body.education,
                bio: body.bio,
                is_profile_done: true,
            };
            const result = await queryRunner.manager.update(User, authuser.id, updateData);
            if (result.affected === 0) {
                await queryRunner.rollbackTransaction();
                return ResponseHelper.error(res, "User not found", 404);
            }
            if (body.photos && Array.isArray(body.photos)) {
                const photoEntities = body.photos.map(photoUrl => {
                    const photo = new Photo();
                    photo.user = authuser;
                    photo.url = photoUrl;
                    return photo;
                });
                await queryRunner.manager.save(Photo, photoEntities);
            }
            await queryRunner.commitTransaction();
            return ResponseHelper.success(res, "Profile updated successfully");
        } catch (e) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            next(e);
        } finally {
            await queryRunner.release();
        }
    }

    static async addPrompt(req, res, next) {
        const promptBody = req.body as Prompt;
        const authuser = req.user as User;
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            const userId = authuser.id;
            const existingPrompt = await Prompt.createQueryBuilder("prompt")
                .where("prompt.user = :userId", { userId })
                .andWhere("DATE(prompt.created_at) = :today", { today })
                .getOne();
            if (existingPrompt) {
                return ResponseHelper.error(res, "You have already added a prompt today.");
            }
            const prompt = new Prompt();
            prompt.prompt = promptBody.prompt;
            prompt.bg_picture = promptBody.bg_picture;
            prompt.latitude = promptBody.latitude;
            prompt.longitude = promptBody.longitude;
            prompt.photo = promptBody.photo;
            prompt.user = authuser;
            prompt.tags = promptBody.tags;
            await prompt.save();
            return ResponseHelper.created(res, prompt);
        } catch (e) {
            next(e);
        }
    }
    static async addPromptCommment(req, res, next) {
        const body = req.body as PromptComment;
        const authuser = req.user as User;
        try {
            const pc = new PromptComment();
            pc.prompt = body.prompt;
            pc.comment = body.comment;
            pc.user = authuser;
            await pc.save();
            return ResponseHelper.created(res, pc);
        } catch (e) {
            next(e);
        }
    }
    static async prompts(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            if (!user) {
                return ResponseHelper.notFound(res, 'User not found');
            }
            const latitude = req.body.latitude || user.latitude;
            const longitude = req.body.longitude || user.longitude;
            const radius = req.body.radius || user.radius;
            console.log(latitude);
            console.log(longitude);
            console.log(radius);
            if (!latitude || !longitude || !radius) {
                return ResponseHelper.error(res, 'Latitude, longitude, or radius missing', 400);
            }
            const prompts = await Prompt.createQueryBuilder("prompt")
                .where(`ST_DistanceSphere(
                        ST_MakePoint(prompt.longitude, prompt.latitude), 
                        ST_MakePoint(:longitude, :latitude)
                        ) <= :radius`, {
                    longitude,
                    latitude,
                    radius: radius * 1000
                })
                .andWhere("prompt.user_id != :userId", { userId: user.id })
                .getMany();

            if (prompts.length > 0) {
                return ResponseHelper.success(res, prompts);
            }
            if (prompts) {
                return ResponseHelper.success(res, prompts);
            }
            const newError = new Error('Not Found')
            return next(newError)
        } catch (e) {
            next(e);
        }
    }
    static async myPrompts(req, res, next) {
        try {
            const prompts = await Prompt.find({ where: { user: { id: req.user.id } } });
            return ResponseHelper.success(res, prompts);
        } catch (e) {
            next(e);
        }
    }
    
}