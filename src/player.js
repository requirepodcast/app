import TrackPlayer from 'react-native-track-player';

import requireLogo from './images/RequireLogo.png';
import { store } from './store/store';

export function episodesToQueue(episodes) {
  const queue = [];
  for (let episode of episodes) {
    queue.push({
      id: episode.id,
      url: episode.audioUrl,
      title: episode.title,
      artist: 'Require Podcast',
      artwork: requireLogo,
    });
  }
  return queue;
}

export function playEpisode(e) {
  TrackPlayer.setupPlayer().then(() => {
    const {
      episodes: { episodes },
    } = store.getState();

    TrackPlayer.reset();
    TrackPlayer.add(episodesToQueue(episodes));
    TrackPlayer.skip(e.id);
    TrackPlayer.play();
  });
}

export async function playbackService() {}
