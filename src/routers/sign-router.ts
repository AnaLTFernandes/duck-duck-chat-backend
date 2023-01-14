import { Router } from "express";
import { insertSession, insertUser } from "controllers";
import { validateSchema } from "middlewares/validate-schema";
import { signInSchema, signUpSchema } from "schemas/sign-schemas";

const signRouter = Router();

signRouter
	.post("/sign-up", validateSchema(signUpSchema), insertUser)
	.post("/sign-in", validateSchema(signInSchema), insertSession);

export { signRouter };
