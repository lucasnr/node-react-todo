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
};
