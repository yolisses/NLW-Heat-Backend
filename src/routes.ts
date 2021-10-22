import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middlewares/authenticate";

export const routes = Router()

routes.post('/authenticate', new AuthenticateUserController().handle)

routes.post('/messages', ensureAuthenticated, new CreateMessageController().handle)
routes.get('/messages', new GetLastMessagesController().handle)

routes.get('/users', ensureAuthenticated, new ProfileUserController().handle)