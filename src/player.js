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
  const {
    episodes: { episodes },
  } = store.getState();

  TrackPlayer.setupPlayer().then(() => {
    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });

    TrackPlayer.reset();
    TrackPlayer.add(episodesToQueue(episodes));
    TrackPlayer.skip(e.id);
    TrackPlayer.play();
  });
}

export async function playbackService() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
}
