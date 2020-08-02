import {
  takeEvery,
  put,
  all,
  call,
  select,
  throttle,
} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { seek as seekAction } from '../actions/player';
import { episodes as episodesAction } from '../actions/episodes';

function* getEpisodes() {
  const episodes = yield fetch(
    'https://require.podcast.gq/episodes.json',
  ).then((res) => res.json());

  yield put(episodesAction(episodes.episodes));
}

function* episodesSaga() {
  yield takeEvery('GET_EPISODES', getEpisodes);
}

function* seek({ to }) {
  const { seekFunc } = yield select((state) => state.player);
  seekFunc(to);
}

function* seekSaga() {
  yield takeEvery('SEEK', seek);
}

function* progress({ progress: episodeProgress }) {
  const { queuePosition } = yield select((state) => state.player);
  yield AsyncStorage.setItem(
    `progress_${queuePosition}`,
    episodeProgress.toString(),
  );
}

function* progressSaga() {
  yield throttle(10000, 'SET_PROGRESS', progress);
}

function* playEpisode() {
  try {
    const { queuePosition } = yield select((state) => state.player);
    const savedProgress = yield AsyncStorage.getItem(
      `progress_${queuePosition}`,
    );

    const savedProgressNumber = Number(savedProgress);

    yield put(seekAction(savedProgressNumber));
  } catch (err) {}
  yield put({ type: 'LOADED' });
}

function* playEpisodeSaga() {
  yield takeEvery('SEEK_FUNC', playEpisode);
}

export function* rootSaga() {
  yield all([
    call(episodesSaga),
    call(seekSaga),
    call(progressSaga),
    call(playEpisodeSaga),
  ]);
}
