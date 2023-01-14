import { NextFunction, Request, Response } from "express";
import * as responseHelper from "helpers/response-helper";
import jwt from "jsonwebtoken";
import { findActiveSessionByUserId } from "repositories/sign-repository";

export async function authenticationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return responseHelper.UNAUTHORIZED({ res });

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

		const session = await findActiveSessionByUserId(payload.user);

		if (!session) return responseHelper.UNAUTHORIZED({ res });

		res.locals.userId = payload.user;
		res.locals.sessionId = session.id;

		next();
	} catch (error) {
		return responseHelper.UNAUTHORIZED({ res });
	}
}

type JwtPayload = {
	user: number;
};
