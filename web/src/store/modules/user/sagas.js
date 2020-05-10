import { call, put, all, takeLatest } from 'redux-saga/effects';

import { updateUser } from '../../../services/api';

export function* update(action) {
	try {
		const { data: user } = yield call(updateUser, action.user);
		yield put({ type: '@USER/UPDATE_USER_SUCCEEDED', user });
	} catch (error) {
		const { data } = error.response;
		yield put({ type: '@USER/UPDATE_USER_FAILED', response: { error: data } });
	}
}

export default function* rootSaga() {
	yield all([takeLatest('@USER/UPDATE_USER_REQUESTED', update)]);
}
