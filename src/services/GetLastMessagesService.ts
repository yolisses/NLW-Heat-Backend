import { db } from "../db";

export class GetLastMessagesService {
    async execute() {
        const messages = await db.message.findMany({
            take: 3,
            orderBy: {
                created_at: 'desc'
            },
            include: {
                user: true
            }
        })

        return messages
    }
}