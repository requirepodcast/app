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

export async function playEpisode(e) {
  const {
    episodes: { episodes },
  } = store.getState();

  await TrackPlayer.setupPlayer();
  await TrackPlayer.reset();
  await TrackPlayer.add(episodesToQueue(episodes));
  await TrackPlayer.skip(e.id);
  await TrackPlayer.play();
}

export async function playbackService() {}
