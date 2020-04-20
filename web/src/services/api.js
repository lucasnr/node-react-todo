import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
	baseURL: 'http://localhost:3333',
});

const headers = () =>
	new Headers({
		Authorization: `Bearer ${getToken()}`,
	});

export const storeUser = (user) => api.post('/users', user);
export const updateUser = (user) => api.patch(`/users/${user.id}`, user);
export const loginUser = (credentials) => api.post('/login', credentials);
export const getSignedUser = () => api.get('/signed', { headers: headers() });

export const storeTask = (task) =>
	api.post(`/tasks`, task, { headers: headers() });

export const listTasks = (done = false, page = 0, size = 5) =>
	api.get(`/tasks?done=${done}&page=${page}&size=${size}`, {
		headers: headers(),
	});

export const updateTask = (id, task) =>
	api.patch(`/tasks/${id}`, task, { headers: headers() });

export const deleteTask = (id) =>
	api.delete(`/tasks/${id}`, { headers: headers() });
