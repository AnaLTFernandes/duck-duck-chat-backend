import { Router } from "express";
import { listAll } from "controllers";

const messageRouter = Router();

messageRouter.get("/messages", listAll);

export { messageRouter };
