const User = require('../models/User');
const urlBuilder = require('./utils/urlBuilder');
const sha256 = require('js-sha256');

module.exports = {
	store: async (req, resp) => {
		const { name, email, avatar_url } = req.body;
		const password = sha256(req.body.password);

		const exists = await User.exists({ email });
		if (exists) {
			resp
				.status(400)
				.json({ message: "There's already a user with this e-mail" });
			return;
		}

		const user = await User.create({
			name,
			email,
			password,
			avatar_url,
		});

		resp
			.status(201)
			.location(urlBuilder(req, `/users/${user.id}`))
			.json(user);
	},
};
