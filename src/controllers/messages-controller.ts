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

export { listAll };
