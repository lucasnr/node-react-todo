const mongoose = require('mongoose');
const sha256 = require('js-sha256');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: { type: String, select: false },
	avatar_url: String,
});

UserSchema.pre('save', async function (next) {
	const crypted = sha256(this.password);
	this.password = crypted;

	next();
});

module.exports = mongoose.model('User', UserSchema);
