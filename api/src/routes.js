const { Router } = require('express');
const UserValidator = require('./validators/UserValidator');
const UserController = require('./controllers/UserController');

const routes = Router();

routes.get('/users', UserValidator.index, UserController.index);
routes.post('/users', UserValidator.store, UserController.store);
routes.get('/users/:id', UserValidator.find, UserController.find);

module.exports = routes;
