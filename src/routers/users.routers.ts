import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { body } from 'express-validator';
import { UserValidators } from "../validators/usersValidators";
import { GlobalMiddleWare } from "../middlewares/global.middleware";
import bodyParser = require('body-parser');
import { uploadMiddleware, uploadToS3Middleware } from "../middlewares/upload.middleware";
import { ChatController } from "../controllers/chat.controller";
export class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/profile', GlobalMiddleWare.authenticate, UserController.profile);
        this.router.get('/get-prompts', GlobalMiddleWare.authenticate, UserController.prompts);
        this.router.get('/get-my-prompts', GlobalMiddleWare.authenticate, UserController.myPrompts);
        // this.router.get('/financial-detail',  GlobalMiddleWare.authenticate, UserController.financialDetail);
        // Chat routes
        this.router.get('/chats', GlobalMiddleWare.authenticate, ChatController.getChats);
        this.router.get('/chat/:chatId', GlobalMiddleWare.authenticate, ChatController.getChatMessages);
    }
    postRoutes() {
        // this.router.post('/create-account', UserValidators.signUp(),GlobalMiddleWare.checkError, UserController.signUp);
        this.router.post('/otp-request', UserValidators.otpRequest(), GlobalMiddleWare.checkError, UserController.sentOTP);
        this.router.post('/login-otp', UserValidators.otp(), GlobalMiddleWare.checkError, UserController.loginOtp);
        // this.router.post('/login', UserValidators.login(), GlobalMiddleWare.checkError,  UserController.login);
        // this.router.post('/signup', UserValidators.signUp(),GlobalMiddleWare.checkError, UserController.signUp);
        this.router.post('/forgot-password', UserValidators.forgotPassword(), GlobalMiddleWare.checkError, UserController.forgotPassword);
        this.router.post('/reset-password', UserValidators.resetPassword(), GlobalMiddleWare.checkError, UserController.resetPassword);
        // create location update api 
        this.router.post('/update-location', UserValidators.location(), GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.updateLocation);
        this.router.post('/upload',
            GlobalMiddleWare.authenticate,
            uploadMiddleware,
            uploadToS3Middleware,
            UserController.uploadProfilePicture
        );
        this.router.post('/update-profile', UserValidators.profileUpdate(), GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.updateProfile);
        this.router.post('/add-prompt', GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.addPrompt);
        this.router.post('/add-comment', GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError, UserController.addPromptCommment);
         // Chat routes
        this.router.post('/chat/start', GlobalMiddleWare.authenticate, ChatController.startChat);
        this.router.post('/chat/send', GlobalMiddleWare.authenticate, ChatController.sendMessage);
    }
    patchRoutes() {
        this.router.post('/verify', UserValidators.verifyUser(), GlobalMiddleWare.checkError, UserController.verify);
    }
    deleteRoutes() {
        this.router.delete('/chat/:chatId', GlobalMiddleWare.authenticate, ChatController.deleteChat);
    }
}
export default new UserRouter().router;