const { Joi } = require('celebrate');

module.exports = Joi.string()
	.required()
	.regex(/^[0-9a-fA-F]{24}$/)
	.error(() => new Error('id must me in a valid pattern'));
