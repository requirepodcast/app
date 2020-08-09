import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import episodes from './reducers/episodes';
import player from './reducers/player';
import { rootSaga } from './sagas/sagas';

// Redux store
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({ episodes, player }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);
