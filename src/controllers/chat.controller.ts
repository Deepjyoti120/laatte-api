import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";

export class ChatController {
    static async getChats(req, res: Response) {
        try {
            const chats = await ChatService.getChats(req.user.id);
            res.status(200).json({ success: true, chats });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    static async startChat(req, res: Response) {
        try {
            const chat = await ChatService.startChat(req.user.id, req.body.receiverId);
            res.status(201).json({ success: true, chat });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async sendMessage(req, res: Response) {
        try {
            const message = await ChatService.sendMessage(req.body.chatId, req.user.id, req.body.message);
            res.status(201).json({ success: true, message });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    static async getChatMessages(req: Request, res: Response) {
        try {
            const messages = await ChatService.getMessages(req.params.chatId);
            res.status(200).json({ success: true, messages });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
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
