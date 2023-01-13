import { Request, Response } from "express";
import * as responseHelper from "helpers/response-helper";
import * as usersService from "services/users-service";

async function getAll(req: Request, res: Response) {
	try {
		const users = await usersService.getAll();
		return responseHelper.OK({ res, body: users });
	} catch (error) {
		return responseHelper.SERVER_ERROR({ res });
	}
}

export { getAll };
