const jwt = require('jsonwebtoken');

const KEY = process.env.JWT_SECRET_KEY;

module.exports = (req, resp, next) => {
	const { authorization } = req.headers;

	if (!authorization)
		return resp
			.status(401)
			.json({ message: 'Authorization header not provided' });

	const parts = authorization.split(' ');
	if (parts.length !== 2)
		return resp.status(401).json({ message: 'Not valid Authorization header' });

	const [scheme, token] = parts;

	if (!/^Bearer$/i.test(scheme))
		return resp.status(401).json({ message: 'Not valid Authorization header' });

	jwt.verify(token, KEY, (error, decoded) => {
		if (error)
			return resp
				.status(401)
				.json({ message: 'The token provided is not valid' });

		req.userId = decoded.id;
		return next();
	});
};
