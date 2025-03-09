import { Brackets } from "typeorm";
import { Chat } from "../models/chat.entity";
import { Message } from "../models/message.entity";
import { User } from "../models/user.entity";

export class ChatService {

    static async getChats(userId: User) {
        return await Chat.find({ where: [{ user1: userId }, { user2: userId }] });
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


    // static async sendMessage(chatId: string, senderId: string, content: string) {
    //     const messageRepo = getRepository(Message);
    //     const message = messageRepo.create({ chatId, senderId, content });
    //     return await messageRepo.save(message);
    // }

    // static async getMessages(chatId: string) { 
    //     return await Message.find({ where: { chatId }, order: { createdAt: "ASC" } });
    // }

    static async deleteChat(chatId: string) {
        return await Chat.delete({ id: chatId });
    }
}
