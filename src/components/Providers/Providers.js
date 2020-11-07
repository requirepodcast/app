import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { rootSaga } from '../../store/sagas/sagas';
import episodes from '../../store/reducers/episodes';
import player from '../../store/reducers/player';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({ episodes, player }), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

function Providers({ children }) {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default Providers;
