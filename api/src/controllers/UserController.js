const jwt = require('jsonwebtoken');
const sha256 = require('js-sha256');

const User = require('../models/User');
const Task = require('../models/Task');
const urlBuilder = require('./utils/urlBuilder');
const pageBuilder = require('./utils/pageBuilder');

function generateToken(id) {
	const KEY = process.env.JWT_SECRET_KEY;
	return jwt.sign({ id }, KEY, {
		expiresIn: 86400,
	});
}

module.exports = {
	index: async (req, resp) => {
		const { page = 0, size = 5 } = req.query;
		const users = await pageBuilder(User, page, size);

		if (users.empty) resp.status(204).send();
		else resp.json(users);
	},
	store: async (req, resp) => {
		const { name, email, avatar_url, password } = req.body;

		const exists = await User.exists({ email });
		if (exists)
			return resp
				.status(400)
				.json({ message: "There's already a user with this e-mail" });

		const user = await User.create({
			name,
			email,
			password,
			avatar_url,
		});

		user.password = undefined;
		resp
			.status(201)
			.location(urlBuilder(req, `/users/${user.id}`))
			.json({ user, token: generateToken(user.id) });
	},
	find: async (req, resp) => {
		const { id } = req.params;
		const user = await User.findById(id);

		if (!user)
			return resp.status(404).json({ message: "There's no user the given id" });

		return resp.json(user);
	},
	login: async (req, resp) => {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select('+password');

		if (!user)
			return resp.status(404).json({
				message: "There's no user with the given email",
				field: 'email',
			});

		if (sha256(password) !== user.password)
			return resp
				.status(400)
				.json({ message: 'Wrong password', field: 'password' });

		return resp.json({ user, token: generateToken(user.id) });
	},
};
