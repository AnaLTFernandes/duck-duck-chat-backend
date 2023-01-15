import { Request, Response } from "express";
import * as responseHelper from "helpers/response-helper";
import * as messagesService from "services/messages-service";

async function listAll(req: Request, res: Response) {
	try {
		const messages = await messagesService.findMessages();
		return responseHelper.OK({ res, body: messages });
	} catch (error) {
		return responseHelper.SERVER_ERROR({ res });
	}
}

async function listAllSentByAnUser(req: Request, res: Response) {
	const userId = Number(req.params.userId);

	try {
		const messages = await messagesService.findMessagesSentByUser(userId);
		return responseHelper.OK({ res, body: messages });
	} catch (error) {
		return responseHelper.SERVER_ERROR({ res });
	}
}

async function insert(req: Request, res: Response) {
	const { userId } = res.locals;

	try {
		await messagesService.createMessage({ userId, ...req.body });
		return responseHelper.CREATED({ res });
	} catch (error) {
		return responseHelper.SERVER_ERROR({ res });
	}
}

async function edit(req: Request, res: Response) {
	const { userId } = res.locals;
	const id = Number(req.params.id);

	try {
		await messagesService.updateMessage({
			userId,
			messageId: id,
			...req.body,
		});

		return responseHelper.NO_CONTENT({ res });
	} catch (error) {
		if (error.name === "NotFound") {
			return responseHelper.NOT_FOUND({
				res,
				body: { message: "Não existe mensagem com esse id." },
			});
		}

		if (error.name === "Unauthorized") {
			return responseHelper.UNAUTHORIZED({
				res,
			});
		}

		return responseHelper.SERVER_ERROR({ res });
	}
}

async function deleteMessage(req: Request, res: Response) {
	const { userId } = res.locals;
	const id = Number(req.params.id);

	try {
		await messagesService.deleteMessage({
			userId,
			messageId: id,
		});

		return responseHelper.NO_CONTENT({ res });
	} catch (error) {
		if (error.name === "NotFound") {
			return responseHelper.NOT_FOUND({
				res,
				body: { message: "Não existe mensagem com esse id." },
			});
		}

		if (error.name === "Unauthorized") {
			return responseHelper.UNAUTHORIZED({
				res,
			});
		}

		return responseHelper.SERVER_ERROR({ res });
	}
}

export { listAll, listAllSentByAnUser, insert, edit, deleteMessage };
