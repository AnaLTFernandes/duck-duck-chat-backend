import { Request, Response } from "express";
import * as responseHelper from "helpers/response-helper";
import * as signService from "services/sign-service";

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

export { insertUser };
