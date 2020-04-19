const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
	title: String,
	text: String,
	datetime: Date,
	done: Boolean,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', TaskSchema);
