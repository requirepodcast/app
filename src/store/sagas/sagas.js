import { takeEvery, put, all } from 'redux-saga/effects';
import { episodes as episodesAction } from '../actions/episodes';

function* getEpisodes() {
  const { episodes } = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put(episodesAction(episodes));
}

export function* rootSaga() {
  yield all([takeEvery('GET_EPISODES', getEpisodes)]);
}
