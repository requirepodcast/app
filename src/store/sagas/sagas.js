import {takeEvery, put} from 'redux-saga/effects';

function* getEpisodes() {
  const episodes = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put({type: 'EPISODES', episodes: episodes.episodes});
}

export function* episodesSaga() {
  yield takeEvery('GET_EPISODES', getEpisodes);
}
