const Task = require('../models/Task');
const urlBuilder = require('./utils/urlBuilder');
const pageBuilder = require('./utils/pageBuilder');

module.exports = {
	index: async (req, resp) => {
		const { userId } = req;
		const { page = 0, size = 5, done = false } = req.query;

		const tasks = await pageBuilder(Task, page, size, { user: userId, done });

		if (tasks.empty) return resp.status(204).send();

		return resp.json(tasks);
	},
	store: async (req, resp) => {
		const { userId } = req;
		const { title, text, datetime } = req.body;

		const task = await Task.create({
			title,
			text,
			datetime,
			done: false,
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

		const task = await Task.find({ user: userId, _id: id });
		if (!task)
			return resp
				.status(404)
				.json({ message: "There's no task with the given id" });

		return resp.json(task);
	},
	update: async (req, resp) => {
		const { userId } = req;
		const { id } = req.params;
		const task = await Task.findOne({ _id: id, user: userId });
		if (!task)
			return resp
				.status(404)
				.json({ message: "There's no task with the given id" });

		const { title, text, datetime, done } = req.body;
		if (title) task.title = title;
		if (text) task.text = text;
		if (datetime) task.datetime = datetime;
		if (done) task.done = done;
		await task.save();

		return resp.json(task);
	},
	destroy: async (req, resp) => {
		const { id } = req.params;
		const { userId } = req;

		const removed = await Task.findOneAndDelete({ _id: id, user: userId });
		if (!removed)
			return resp
				.status(404)
				.json({ message: "There's no task with the given id" });

		return resp.status(204).send();
	},
};
