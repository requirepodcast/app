// @flow
import { takeEvery, put, all } from 'redux-saga/effects';
import SplashScreen from 'react-native-splash-screen';
import { episodes as episodesAction } from '../actions/episodes';
import { Episode } from '../../types';
import { playEpisode } from '../../player';
import EpisodeProgressService from '../../services/EpisodeProgressService';

function* getEpisodes() {
  const { episodes }: { episodes: Episode[] } = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put(episodesAction(episodes));

  yield EpisodeProgressService.lastPlaying.get().then((id) => id && playEpisode(id, false));

  SplashScreen.hide();
}

export function* rootSaga(): any {
  yield all([takeEvery('GET_EPISODES', getEpisodes)]);
}
