// @flow
import { takeEvery, put, all } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { episodes as episodesAction } from '../actions/episodes';
import { Episode } from '../../types';
import { playEpisode } from '../../player';

function* getEpisodes() {
  const { episodes }: { episodes: Episode[] } = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put(episodesAction(episodes));

  yield AsyncStorage.getItem('last_playing')
    .then((id) => {
      if (id) {
        playEpisode(id, false);
      }
    })
    .catch(() => {});
}

export function* rootSaga(): any {
  yield all([takeEvery('GET_EPISODES', getEpisodes)]);
}
