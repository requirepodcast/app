import { takeEvery, all } from 'redux-saga/effects';
import { getEpisodes } from './episodes';

export function* rootSaga(): any {
  yield all([takeEvery('GET_EPISODES', getEpisodes)]);
}
