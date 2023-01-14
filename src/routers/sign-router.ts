import { Router } from "express";
import { insertUser } from "controllers";
import { validateSchema } from "middlewares/validate-schema";
import { signUpSchema } from "schemas/sign-schemas";

const signRouter = Router();

signRouter.post("/sign-up", validateSchema(signUpSchema), insertUser);

export { signRouter };
