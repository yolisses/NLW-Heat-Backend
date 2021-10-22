import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

export class ProfileUserController {
    async handle(req: Request, res: Response) {
        const { user_id } = req
        const service = new ProfileUserService()
        const user = await service.execute(user_id)
        if (!user) {
            return res.status(404).json({
                err: "User not found: " + user_id,
                errorCode: 'user.notFound'
            })
        }
        return res.json(user)
    }
}