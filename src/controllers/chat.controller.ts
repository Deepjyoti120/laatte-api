import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";
import ResponseHelper from "../services/ResponseHelper";

export class ChatController {
    static async getChats(req, res: Response, next) {
        try {
            const chats = await ChatService.getChats(req.user.id);
            return ResponseHelper.success(res, chats);
        } catch (e) {
            next(e);
        }
    }
    static async startChat(req, res: Response, next) {
        try {
            const chat = await ChatService.startChat(req.user.id, req.body.receiverId);
            // res.status(201).json({ success: true, chat });
            return ResponseHelper.created(res, chat);
        } catch (error) {
          next(error);
        }
    }

    static async sendMessage(req, res: Response, next) {
        try {
            const message = await ChatService.sendMessage(req.body.chatId, req.user.id, req.body.message);
            // res.status(201).json({ success: true, message });
            return ResponseHelper.created(res,message);
        } catch (e) {
            next(e);
        }
    }

    static async getChatMessages(req: Request, res: Response, next) {
        try {
            const chatId = req.params.chatId;
            const messages = await ChatService.getMessages(chatId);
            // req.app.get("io").to(chatId).emit("chatHistory", messages);
            // res.status(200).json({ success: true, messages });
            return ResponseHelper.success(res, messages);
        } catch (e) {
            next(e);
        }
    }
    

    static async deleteChat(req: Request, res: Response) {
        try {
            await ChatService.deleteChat(req.params.chatId);
            res.status(200).json({ success: true, message: "Chat deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
