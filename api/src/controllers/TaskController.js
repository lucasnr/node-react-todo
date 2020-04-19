const Task = require('../models/Task');
const urlBuilder = require('./utils/urlBuilder');

module.exports = {
	store: async (req, resp) => {
		const { userId } = req;
		const { title, text, datetime, done } = req.body;

		const task = await Task.create({
			title,
			text,
			datetime,
			done,
			user: userId,
		});

		resp
			.status(201)
			.location(urlBuilder(req, `/tasks/${task.id}`))
			.json(task);
	},
	find: async (req, resp) => {
		const { userId } = req;
		const { id } = req.params;

		const task = await Task.find({ user: userId, _id: id }).populate('user');
		if (!task)
			return resp
				.status(404)
				.json({ message: "There's no task with the given id" });

		return resp.json(task);
	},
};
