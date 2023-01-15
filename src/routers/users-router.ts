import { Router } from "express";
import { getAll } from "../controllers";

const usersRouter = Router();

usersRouter.get("/users", getAll);

export { usersRouter };
