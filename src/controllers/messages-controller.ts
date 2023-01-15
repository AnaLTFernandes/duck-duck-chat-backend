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
	const userId = Number(req.params.userId) || null;

	if (!userId) {
		return responseHelper.BAD_REQUEST({
			res,
			body: { message: "Id de usuário inválido." },
		});
	}

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

export { listAll, listAllSentByAnUser, insert };
