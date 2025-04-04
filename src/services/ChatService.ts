import { Brackets } from "typeorm";
import { Chat } from "../models/chat.entity";
import { Message } from "../models/message.entity";
import { User } from "../models/user.entity";
import { Prompt } from "../models/prompt.entity";
import { PromptComment } from "../models/prompt_comment.entity";
import { MatchPrompt } from "../models/swiped_prompts.entity";

export class ChatService {
    static async getChats(userId: string) {
        const chats = await Chat.find({
            where: [
                { user1: { id: userId } },
                { user2: { id: userId } }
            ],
            relations: ['user1', 'user2', 'lastMessage'],
            order: { updated_at: 'DESC' }
        });
        return chats.map(chat => {
            const otherUser = chat.user1.id === userId ? chat.user2 : chat.user1;
            return {
                id: chat.id,
                created_at: chat.created_at,
                updated_at: chat.updated_at,
                user: otherUser,
                lastMessage: chat.lastMessage,
            };
        });
    }

    static async startChat(user1Id: User, user2Id: User, req) {
        let chat = await Chat.createQueryBuilder("chat")
            .where(new Brackets(qb => {
                qb.where("chat.user1 = :user1 AND chat.user2 = :user2", { user1: user1Id, user2: user2Id })
                    .orWhere("chat.user1 = :user2 AND chat.user2 = :user1", { user1: user1Id, user2: user2Id });
            }))
            .getOne();

        if (!chat) {
            chat = Chat.create({ user1: user1Id, user2: user2Id });
            await chat.save();
            const prompt = req.body.prompt as Prompt;
            const comment = req.body.comment as PromptComment;
            await MatchPrompt.create({
                user: { id: req.user.id },
                prompt: { id: prompt.id },
                // action: "right",
            }).save();
            // await ChatService.sendMessage(chat.id, req.user.id, req.body.message);
            const preMessages = [prompt.prompt, comment.comment];
            const preIds = [req.user.id, req.body.receiverId];
            for (let index = 0; index < 2; index++) {
                await ChatService.sendMessage(chat.id, preIds[index], preMessages[index]);
            }
        }
        return chat;
    }


    static async sendMessage(chatId: string, senderId: string, content: string) {
        try {
            if (!chatId || !senderId || !content.trim()) {
                console.log(chatId, senderId, content);
                throw new Error("chatId, senderId, and content are required.");
            }

            const chat = await Chat.findOne({ where: { id: chatId }, relations: ["user1", "user2"], });
            if (!chat) {
                throw new Error("Chat not found.");
            }

            const sender = await User.findOne({ where: { id: senderId } });
            if (!sender) {
                throw new Error("Sender not found.");
            }

            const message = Message.create({ chat, sender, content });
            await message.save();

            chat.lastMessage = message;
            await chat.save();

            return message;
        } catch (error) {
            throw new Error(`Failed to send message: ${error.message}`);
        }
    }




    static async getMessages(chatId: string) {
        return await Message.find({ where: { chat: { id: chatId } }, relations: ['sender'], order: { created_at: "ASC" } });
    }

    static async deleteChat(chatId: string) {
        return await Chat.delete({ id: chatId });
    }

}
