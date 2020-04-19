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
			title: Joi.string().required().min(3),
			text: Joi.string().required().min(15),
			datetime: Joi.date().required(),
			done: Joi.boolean().required(),
		}),
	}),
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
	}),
	destroy: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
	}),
};
