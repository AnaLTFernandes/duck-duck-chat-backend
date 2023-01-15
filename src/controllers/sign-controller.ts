import { Request, Response } from "express";
import * as responseHelper from "../helpers/response-helper";
import * as signService from "../services/sign-service";

async function insertUser(req: Request, res: Response) {
	try {
		await signService.createUser(req.body);
		return responseHelper.NO_CONTENT({ res });
	} catch (error) {
		if (error.name === "Conflict") {
			return responseHelper.CONFLICT({ res });
		}

		return responseHelper.SERVER_ERROR({ res });
	}
}

async function insertSession(req: Request, res: Response) {
	try {
		const session = await signService.createSession(req.body);
		return responseHelper.OK({ res, body: session });
	} catch (error) {
		if (error.name === "BadRequest") {
			return responseHelper.BAD_REQUEST({
				res,
				body: { message: "Usuário/Senha inválidos." },
			});
		}

		return responseHelper.SERVER_ERROR({ res });
	}
}

async function finishSession(req: Request, res: Response) {
	try {
		await signService.finishSession(res.locals.sessionId);
		return responseHelper.NO_CONTENT({ res });
	} catch (error) {
		return responseHelper.SERVER_ERROR({ res });
	}
}

export { insertUser, insertSession, finishSession };
