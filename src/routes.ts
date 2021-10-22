import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { ensureAuthenticated } from "./middlewares/authenticate";

export const routes = Router()

routes.post('/authenticate', new AuthenticateUserController().handle)

routes.post('/message', ensureAuthenticated, new CreateMessageController().handle)