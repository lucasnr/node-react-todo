const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
	store: celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().required().min(3),
			text: Joi.string().required().min(15),
			datetime: Joi.date().required(),
			done: Joi.boolean().required(),
		}),
	}),
};
