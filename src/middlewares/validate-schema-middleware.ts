import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import * as responseHelper from "helpers/response-helper";

export function validateSchema(schema: Joi.ObjectSchema<any>, type = 'body') {
	return (req: Request, res: Response, next: NextFunction) => {
		const validation = schema.validate(req[type], { abortEarly: false });

		if (validation.error) {
			const errors = validation.error.details.map(({ message }) => message);
			return responseHelper.BAD_REQUEST({ res, body: errors });
		}

		next();
	};
}
