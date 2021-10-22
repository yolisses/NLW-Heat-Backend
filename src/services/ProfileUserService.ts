import { db } from "../db";

export class ProfileUserService {
    async execute(user_id: string) {
        const user = await db.user.findUnique({
            where: {
                id: user_id
            }
        })
        return user
    }
}