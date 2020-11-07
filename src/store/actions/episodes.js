export function getEpisodes() {
  return {
    type: 'GET_EPISODES',
  };
}

export function episodes(episodesArray) {
  return {
    type: 'EPISODES',
    episodes: episodesArray,
  };
}
