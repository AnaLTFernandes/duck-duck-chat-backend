import Joi from "joi";

const postSchema = Joi.object({
	text: Joi.string().required(),
});

export { postSchema };
