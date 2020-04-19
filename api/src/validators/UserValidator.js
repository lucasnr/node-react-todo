const { celebrate, Segments, Joi } = require('celebrate');

const JoiMongoId = require('./utils/JoiMongoIdValidator');

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
