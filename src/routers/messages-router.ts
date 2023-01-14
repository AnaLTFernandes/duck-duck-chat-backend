import { Router } from "express";
import { listAll, listAllSentByAnUser } from "controllers";

const messageRouter = Router();

messageRouter
	.get("/messages", listAll)
	.get("/messages/:userId", listAllSentByAnUser);

export { messageRouter };
