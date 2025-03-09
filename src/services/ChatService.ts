import { Brackets } from "typeorm";
import { Chat } from "../models/chat.entity";
import { Message } from "../models/message.entity";
import { User } from "../models/user.entity";

export class ChatService {

    static async getChats(userId: string) {
        const chats = await Chat.find({
            where: [
                { user1: { id: userId } },
                { user2: { id: userId } }
            ],
            relations: ['user1', 'user2'],
            order: { updated_at: 'DESC' }
        });
        return chats.map(chat => {
            const otherUser = chat.user1.id === userId ? chat.user2 : chat.user1;
            return {
                id: chat.id,
                created_at: chat.created_at,
                updated_at: chat.updated_at,
                user: otherUser
            };
        });
    }

    static async startChat(user1Id: User, user2Id: User) {
        let chat = await Chat.createQueryBuilder("chat")
            .where(new Brackets(qb => {
                qb.where("chat.user1 = :user1 AND chat.user2 = :user2", { user1: user1Id, user2: user2Id })
                    .orWhere("chat.user1 = :user2 AND chat.user2 = :user1", { user1: user1Id, user2: user2Id });
            }))
            .getOne();

        if (!chat) {
            chat = Chat.create({ user1: user1Id, user2: user2Id });
            await chat.save();
        }
        return chat;
    }


    static async sendMessage(chatId: string, senderId: string, content: string) {
        try {
            if (!chatId || !senderId || !content.trim()) {
                throw new Error("chatId, senderId, and content are required.");
            }
            const chat = await Chat.findOne({ where: { id: chatId } });
            if (!chat) {
                throw new Error("Chat not found.");
            }
            const sender = await User.findOne({ where: { id: senderId } });
            if (!sender) {
                throw new Error("Sender not found.");
            }
            const message = Message.create({ chat, sender, content });
            await message.save();
            return message;
        } catch (error) {
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }
    
    

    static async getMessages(chatId: string) { 
        return await Message.find({ where: { chat: { id: chatId } }, order: { created_at: "ASC" } });
    }

    static async deleteChat(chatId: string) {
        return await Chat.delete({ id: chatId });
    } 
    
}
