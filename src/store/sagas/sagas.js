import { takeEvery, put, all, call, select } from 'redux-saga/effects';

function* getEpisodes() {
  const episodes = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then(res => res.json());

  yield put({ type: 'EPISODES', episodes: episodes.episodes });
}

function* episodesSaga() {
  yield takeEvery('GET_EPISODES', getEpisodes);
}

function* seek({ to }) {
  const { seekFunc } = yield select(state => state.player);
  seekFunc(to);
}

function* seekSaga() {
  yield takeEvery('SEEK', seek);
}

export function* rootSaga() {
  yield all([call(episodesSaga), call(seekSaga)]);
}
