import TrackPlayer, {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  getCurrentTrack,
  getState,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

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

export function playEpisode(id, autoPlay = true) {
  const {
    episodes: { episodes },
  } = store.getState();

  TrackPlayer.setupPlayer({ backBuffer: 10, minBuffer: 10 }).then(async () => {
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
    await TrackPlayer.skip(id);

    if (autoPlay) {
      TrackPlayer.play();
    }

    AsyncStorage.getItem(`progress_${id}`)
      .then((savedPosition) => TrackPlayer.seekTo(Number(savedPosition)))
      .catch(() => {});

    AsyncStorage.setItem('last_playing', `${id}`);
  });
}

export async function playbackService() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
    AsyncStorage.setItem('last_playing', '');
  });

  AsyncStorage.getItem('last_playing')
    .then((id) => {
      if (id) {
        playEpisode(id, false);
      }
    })
    .catch(() => {});
}

import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setPlayerState } from './store/actions/player';

export function usePlayer() {
  const { episodes } = useSelector((state) => state.episodes);
  const [playbackState, setPlaybackState] = useState(null);
  const [episode, setEpisode] = useState(null);
  const { position, duration } = useTrackPlayerProgress();
  const dispatch = useDispatch();

  useTrackPlayerEvents(
    [
      TrackPlayerEvents.PLAYBACK_STATE,
      TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
    ],
    (e) => {
      if (e.type === TrackPlayerEvents.PLAYBACK_STATE) {
        setPlaybackState(e.state);
      }

      if (e.type === TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
        if (e.nextTrack) {
          setEpisode(episodes.find((ep) => ep.id === e.nextTrack));
        } else {
          setEpisode(null);
        }

        AsyncStorage.removeItem(`progress_${e.track}`);
      }
    },
  );

  useEffect(() => {
    getCurrentTrack().then((id) => {
      setEpisode(episodes.find((ep) => ep.id === id));
    });

    getState().then((state) => {
      setPlaybackState(state);
    });
  }, [episodes]);

  const disabled =
    !playbackState ||
    (playbackState !== TrackPlayer.STATE_PAUSED &&
      playbackState !== TrackPlayer.STATE_PLAYING);

  const playing = playbackState === TrackPlayer.STATE_PLAYING;

  useEffect(() => {
    dispatch(
      setPlayerState({
        position: parseInt(position, 10),
        duration: parseInt(duration, 10),
        episode,
        playbackState,
        disabled,
        playing,
      }),
    );
  }, [position, duration, episode, playbackState, disabled, playing]);

  useEffect(() => {
    (async () => {
      if (episode && position) {
        AsyncStorage.setItem(`progress_${episode.id}`, position.toString());
      }
    })();
  }, [position]);

  return {
    position: parseInt(position, 10),
    duration: parseInt(duration, 10),
    episode,
    playbackState,
    disabled,
    playing,
  };
}
