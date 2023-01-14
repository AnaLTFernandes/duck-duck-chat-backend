import { Router } from "express";
import { finishSession, insertSession, insertUser } from "controllers";
import { validateSchema } from "middlewares/validate-schema-middleware";
import { signInSchema, signUpSchema } from "schemas/sign-schemas";
import { authenticationMiddleware } from "middlewares/authentication-middleware";

const signRouter = Router();

signRouter
	.post("/sign-up", validateSchema(signUpSchema), insertUser)
	.post("/sign-in", validateSchema(signInSchema), insertSession)
	.post("/sign-out", authenticationMiddleware, finishSession);

export { signRouter };
