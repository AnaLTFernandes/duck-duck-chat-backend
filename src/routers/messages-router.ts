import { Router } from "express";
import { insert, listAll, listAllSentByAnUser } from "controllers";
import { authenticationMiddleware } from "middlewares/authentication-middleware";
import { validateSchema } from "middlewares/validate-schema-middleware";
import { postSchema } from "schemas/message-schemas";

const messageRouter = Router();

messageRouter
	.get("/messages", listAll)
	.get("/messages/:userId", listAllSentByAnUser)
	.all("/*", authenticationMiddleware)
	.post("/messages", validateSchema(postSchema), insert);

export { messageRouter };
