import { Router } from "express";
import { signInSchema, signUpSchema } from "../schemas/sign-schemas";
import { validateSchema } from "../middlewares/validate-schema-middleware";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { finishSession, insertSession, insertUser } from "../controllers";

const signRouter = Router();

signRouter
	.post("/sign-up", validateSchema(signUpSchema), insertUser)
	.post("/sign-in", validateSchema(signInSchema), insertSession)
	.post("/sign-out", authenticationMiddleware, finishSession);

export { signRouter };
