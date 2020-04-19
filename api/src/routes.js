const { Router } = require('express');
const AuthMiddleware = require('./middlewares/AuthorizationMiddleware');
const UserValidator = require('./validators/UserValidator');
const UserController = require('./controllers/UserController');
const TaskValidator = require('./validators/TaskValidator');
const TaskController = require('./controllers/TaskController');

const routes = Router();

routes.get('/users', UserValidator.index, UserController.index);
routes.post('/users', UserValidator.store, UserController.store);
routes.get('/users/:id', UserValidator.find, UserController.find);

routes.post('/login', UserValidator.login, UserController.login);

routes.get('/tasks', AuthMiddleware, TaskValidator.index, TaskController.index);
routes.post(
	'/tasks',
	AuthMiddleware,
	TaskValidator.store,
	TaskController.store
);
routes.get(
	'/tasks/:id',
	AuthMiddleware,
	TaskValidator.find,
	TaskController.find
);

module.exports = routes;
