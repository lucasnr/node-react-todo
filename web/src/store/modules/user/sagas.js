import { call, put, all, takeLatest } from 'redux-saga/effects';

import { getSignedUser, storeUser } from '../../../services/api';
import { setToken } from '../../../services/auth';

export function* setUser() {
	const { data: user } = yield call(getSignedUser);
	yield put({ type: 'SET_USER_SUCCEEDED', user });
}

export function* signupUser(action) {
	const { email, password } = action.credentials;
	const { data } = yield call(storeUser, { email, password });

	const { user, token } = data;
	setToken(token);
	yield put({ type: 'SET_USER_SUCCEEDED', user });
}

export default function* rootSaga() {
	yield all([
		takeLatest('SET_USER_REQUESTED', setUser),
		takeLatest('SIGNUP_USER_REQUESTED', signupUser),
	]);
}
