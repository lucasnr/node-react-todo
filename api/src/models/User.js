const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: { type: String, select: false },
	avatar_url: String,
});

module.exports = mongoose.model('User', UserSchema);
