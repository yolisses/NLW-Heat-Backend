import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

export class CreateMessageController {
    async handle(req: Request, res: Response) {
        const { text } = req.body
        const { user_id } = req

        const service = new CreateMessageService()
        try {
            const message = await service.execute(text, user_id)
            return res.json(message)
        } catch (err) {
            return res.status(400).json({ error: err.message })
        }
    }
}