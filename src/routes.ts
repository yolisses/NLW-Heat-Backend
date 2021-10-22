import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";

export const routes = Router()

routes.post('/authenticate', new AuthenticateUserController().handle)