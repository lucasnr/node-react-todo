const { celebrate, Segments, Joi } = require('celebrate');

const JoiMongoId = require('./utils/JoiMongoIdValidator');

module.exports = {
	index: celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number().integer(),
			size: Joi.number().integer().greater(0),
		}),
	}),
	store: celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().min(4),
			email: Joi.string().required().email(),
			password: Joi.string().required().min(8).max(24),
			avatar_url: Joi.string(),
		}),
	}),
	update: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
		[Segments.BODY]: Joi.object()
			.keys({
				name: Joi.string().min(4),
				email: Joi.string().email(),
				password: Joi.string().min(8).max(24),
				avatar_url: Joi.string(),
			})
			.unknown(),
	}),
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
	}),
	login: celebrate({
		[Segments.BODY]: Joi.object().keys({
			email: Joi.string().required().email(),
			password: Joi.string().required().min(8),
		}),
	}),
};
