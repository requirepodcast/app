import { takeEvery, put, all } from 'redux-saga/effects';
import TrackPlayer from 'react-native-track-player';
import { episodes as episodesAction } from '../actions/episodes';
import { episodesToQueue } from '../../utils/episodesToQueue';

function* getEpisodes() {
  const { episodes } = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield TrackPlayer.setupPlayer();
  yield TrackPlayer.add(episodesToQueue(episodes));
  yield put(episodesAction(episodes));
}

export function* rootSaga() {
  yield all([takeEvery('GET_EPISODES', getEpisodes)]);
}
