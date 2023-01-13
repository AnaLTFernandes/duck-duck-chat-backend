import { getAll } from "controllers";
import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/users", getAll);

export { usersRouter };
