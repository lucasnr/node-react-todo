import { call, put, all, takeLatest } from 'redux-saga/effects';

import { storeUser, getSignedUser, loginUser } from '../../../services/api';
import { getToken, setToken, removeToken } from '../../../services/auth';

export function* signup(action) {
	try {
		const { email, password } = action.credentials;
		const { data } = yield call(storeUser, { email, password });

		const { user, token } = data;
		setToken(token);
		yield put({ type: '@USER/SIGNIN_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: '@AUTH/SIGNUP_USER_FAILED', error: data });
	}
}

export function* signin(action) {
	try {
		const token = getToken();
		if (token) {
			const { data: user } = yield call(getSignedUser);
			yield put({ type: '@USER/SIGNIN_USER_SUCCEEDED', user, token });
		} else {
			const response = yield call(loginUser, action.credentials);
			const { token, user } = response.data;
			setToken(token);
			yield put({ type: '@USER/SIGNIN_USER_SUCCEEDED', user, token });
		}
	} catch (error) {
		const { data } = error.response;
		yield put({ type: '@AUTH/SIGNIN_USER_FAILED', error: data });
	}
}

export function* signout() {
	removeToken();
	yield put({ type: '@AUTH/SIGNOUT_USER_SUCCEEDED' });
	yield put({ type: '@USER/REMOVE_USER' });
}

export default function* rootSaga() {
	yield all([
		takeLatest('@AUTH/SIGNUP_USER_REQUESTED', signup),
		takeLatest('@AUTH/SIGNIN_USER_REQUESTED', signin),
		takeLatest('@AUTH/SIGNOUT_USER_REQUESTED', signout),
	]);
}
