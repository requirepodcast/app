import { put } from 'redux-saga/effects';
import SplashScreen from 'react-native-splash-screen';
import { episodes as episodesAction } from '../actions/episodes';

export function* getEpisodes() {
  const { episodes } = yield fetch('https://require.podcast.gq/episodes.json').then(res =>
    res.json(),
  );

  yield put(episodesAction(episodes));

  SplashScreen.hide();
}
