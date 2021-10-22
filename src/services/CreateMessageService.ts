import { db } from "../db";

export class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await db.message.create({
            data: {
                text,
                user_id
            },
            include: {
                user: true
            }
        })

        return message
    }
}