import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { validateSchema } from "../middlewares/validate-schema-middleware";
import {
	listParamsSchema,
	postParamsSchema,
	postSchema,
} from "../schemas/message-schemas";
import {
	deleteMessage,
	edit,
	insert,
	listAll,
	listAllSentByAnUser,
} from "../controllers";

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
	)
	.delete(
		`${route}/:id`,
		validateSchema(postParamsSchema, "params"),
		deleteMessage
	);

export { messageRouter };
