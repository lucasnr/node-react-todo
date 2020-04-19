const mongoose = require('mongoose');
const sha256 = require('js-sha256');

const UserSchema = new mongoose.Schema({
	name: String,
	email: { type: String, required: true },
	password: { type: String, required: true, select: false },
	avatar_url: String,
});

UserSchema.pre('save', async function (next) {
	if (this.__v === undefined) {
		const crypted = sha256(this.password);
		this.password = crypted;
	}

	next();
});

module.exports = mongoose.model('User', UserSchema);
