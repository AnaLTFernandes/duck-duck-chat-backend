import { Router } from "express";
import { edit, insert, listAll, listAllSentByAnUser } from "controllers";
import { authenticationMiddleware } from "middlewares/authentication-middleware";
import { validateSchema } from "middlewares/validate-schema-middleware";
import {
	listParamsSchema,
	postParamsSchema,
	postSchema,
} from "schemas/message-schemas";

const messageRouter = Router();

const route = "/messages";

messageRouter
	.get(route, listAll)
	.get(
		`${route}/:userId`,
		validateSchema(listParamsSchema, "params"),
		listAllSentByAnUser
	)
	.all("/*", authenticationMiddleware)
	.post(route, validateSchema(postSchema), insert)
	.put(
		`${route}/:id`,
		validateSchema(postSchema),
		validateSchema(postParamsSchema, "params"),
		edit
	);

export { messageRouter };
