const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	store: celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required().min(4),
			email: Joi.string().required().email(),
			password: Joi.string().required().min(8),
			avatar_url: Joi.string().required(),
		}),
	}),
	index: celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number().integer(),
			size: Joi.number().integer().greater(0),
		}),
	}),
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.string()
				.required()
				.regex(/^[0-9a-fA-F]{24}$/)
				.error(() => new Error('id must me in a valid pattern')),
		}),
	}),
	login: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().required().email(),
			password: Joi.string().required().min(8),
		}),
	}),
};
