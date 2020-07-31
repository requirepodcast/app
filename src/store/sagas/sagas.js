import {takeEvery, put, all, call} from 'redux-saga/effects';

function* getEpisodes() {
  const episodes = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put({type: 'EPISODES', episodes: episodes.episodes});
}

function* episodesSaga() {
  yield takeEvery('GET_EPISODES', getEpisodes);
}

export function* rootSaga() {
  yield all([call(episodesSaga)]);
}
