const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost:27017/todo', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errors());

const PORT = 3333;
app.listen(PORT, () => {
	console.log(`App running at port ${PORT}`);
});
