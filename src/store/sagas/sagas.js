// @flow
import { takeEvery, put, all } from 'redux-saga/effects';
import { episodes as episodesAction } from '../actions/episodes';
import { Episode } from '../../types';

function* getEpisodes() {
  const { episodes }: { episodes: Episode[] } = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put(episodesAction(episodes));
}

export function* rootSaga(): any {
  yield all([takeEvery('GET_EPISODES', getEpisodes)]);
}
