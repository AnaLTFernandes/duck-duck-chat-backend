import Joi from "joi";

const imageFormatRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const signUpSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	image: Joi.string()
		.regex(imageFormatRegex)
		.message("Image URL Error: a url da imagem é inválida")
		.required(),
});

const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export { signUpSchema, signInSchema };
