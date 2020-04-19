const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	title: { type: String, required: true },
	text: String,
	datetime: Date,
	done: { type: Boolean, default: false },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		select: false,
	},
});

module.exports = mongoose.model('Task', TaskSchema);
