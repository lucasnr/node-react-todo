import { call, put, all, takeLatest } from 'redux-saga/effects';

import { getSignedUser, storeUser, loginUser } from '../../../services/api';
import { setToken } from '../../../services/auth';

export function* set() {
	try {
		const { data: user } = yield call(getSignedUser);
		yield put({ type: 'SIGNIN_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'SIGNIN_USER_FAILED', error: data });
	}
}

export function* signup(action) {
	try {
		const { email, password } = action.credentials;
		const { data } = yield call(storeUser, { email, password });

		const { user, token } = data;
		setToken(token);
		yield put({ type: 'SIGNIN_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'SIGNIN_USER_FAILED', error: data });
	}
}

export function* signin(action) {
	try {
		const { data } = yield call(loginUser, action.credentials);
		setToken(data.token);
		yield put({ type: 'SIGNIN_USER_SUCCEEDED', user: data.user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: 'SIGNIN_USER_FAILED', error: data });
	}
}

export default function* rootSaga() {
	yield all([
		takeLatest('SET_USER_REQUESTED', set),
		takeLatest('SIGNUP_USER_REQUESTED', signup),
		takeLatest('SIGNIN_USER_REQUESTED', signin),
	]);
}
