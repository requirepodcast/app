// @flow
import { Episode } from '../../types';

export interface Action {
  type: string;
  episodes: Episode[];
}

export function getEpisodes() {
  return {
    type: 'GET_EPISODES',
  };
}

export function episodes(episodesArray: Episode[]) {
  return {
    type: 'EPISODES',
    episodes: episodesArray,
  };
}
