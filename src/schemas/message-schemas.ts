import Joi from "joi";

const postSchema = Joi.object({
	text: Joi.string().required(),
});

const postParamsSchema = Joi.object({
	id: Joi.number().integer().min(1).required(),
});

const listParamsSchema = Joi.object({
	userId: Joi.number().integer().min(1).required(),
});

export { postSchema, postParamsSchema, listParamsSchema };
