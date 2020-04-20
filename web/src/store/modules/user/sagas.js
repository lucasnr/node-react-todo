import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
	getSignedUser,
	storeUser,
	loginUser,
	updateUser,
} from '../../../services/api';
import { setToken, removeToken } from '../../../services/auth';

export function* set() {
	try {
		const { data: user } = yield call(getSignedUser);
		yield put({ type: 'SET_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'SET_USER_FAILED', error: data });
	}
}

export function* signup(action) {
	try {
		const { email, password } = action.credentials;
		const { data } = yield call(storeUser, { email, password });

		const { user, token } = data;
		setToken(token);
		yield put({ type: 'SET_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'SIGNUP_USER_FAILED', error: data });
	}
}

export function* signin(action) {
	try {
		const { data } = yield call(loginUser, action.credentials);
		setToken(data.token);
		yield put({ type: 'SET_USER_SUCCEEDED', user: data.user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'SIGNIN_USER_FAILED', error: data });
	}
}

export function* update(action) {
	try {
		const { data: user } = yield call(updateUser, action.user);
		yield put({ type: 'UPDATE_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'UPDATE_USER_FAILED', error: data });
	}
}

export function* signout(action) {
	removeToken();
	yield put({ type: 'SIGNOUT_USER_SUCCEEDED' });
}

export default function* rootSaga() {
	yield all([
		takeLatest('SET_USER_REQUESTED', set),
		takeLatest('SIGNUP_USER_REQUESTED', signup),
		takeLatest('SIGNIN_USER_REQUESTED', signin),
		takeLatest('UPDATE_USER_REQUESTED', update),
		takeLatest('SIGNOUT_USER_REQUESTED', signout),
	]);
}
