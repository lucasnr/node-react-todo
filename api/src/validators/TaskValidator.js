const { celebrate, Segments, Joi } = require('celebrate');

const JoiMongoId = require('./utils/JoiMongoIdValidator');

module.exports = {
	index: celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number().integer(),
			size: Joi.number().integer().greater(0),
			done: Joi.boolean(),
		}),
	}),
	store: celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().required().min(3),
			text: Joi.string().min(10),
			datetime: Joi.date(),
		}),
	}),
	find: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
	}),
	update: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().min(3),
			text: Joi.string().min(10),
			datetime: Joi.date(),
			done: Joi.boolean(),
		}),
	}),
	destroy: celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: JoiMongoId,
		}),
	}),
};
