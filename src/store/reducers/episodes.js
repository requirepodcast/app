// @flow
import { Episode } from '../../types';
import { Action } from '../actions/episodes';

function reducer(
  state: { episodes: Episode[] } = { episodes: [] },
  action: Action,
) {
  switch (action.type) {
    case 'EPISODES':
      return { ...state, episodes: action.episodes };
    default:
      return state;
  }
}

export default reducer;
