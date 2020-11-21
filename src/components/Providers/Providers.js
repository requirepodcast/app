import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { rootSaga } from '../../store/sagas/sagas';
import episodes from '../../store/reducers/episodes';

import PlayerProvider from '../PlayerProvider/PlayerProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getEpisodes } from '../../store/actions/episodes';
import { useMount } from '../../utils/useMount';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({ episodes }), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

function Providers({ children }) {
  useMount(() => {
    store.dispatch(getEpisodes());
  });

  return (
    <Provider store={store}>
      <PlayerProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </PlayerProvider>
    </Provider>
  );
}

export default Providers;
