import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import userSaga from './modules/user/sagas';
import authSaga from './modules/auth/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);
sagaMiddleware.run(authSaga);

export default store;
