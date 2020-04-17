const express = require('express');

const routes = express.Router();

routes.get('/', (req, resp) => {
	resp.send({ message: 'Goodbye World' });
});

module.exports = routes;
