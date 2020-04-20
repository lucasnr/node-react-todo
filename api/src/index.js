require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
	console.log(`App running at port ${PORT}`);
});
