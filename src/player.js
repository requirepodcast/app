// @flow
import TrackPlayer, {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
  TrackPlayerEvents,
  getCurrentTrack,
  getState,
  getDuration,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

import requireLogo from './images/RequireLogo.png';
import { store } from './store/store';

import { Episode } from './types';

interface QueueItem {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: any;
}

export function episodesToQueue(episodes: Episode[]): QueueItem[] {
  const queue: QueueItem[] = [];
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

export function playEpisode(id: string, autoPlay: boolean = true) {
  const {
    episodes: { episodes },
  }: { episodes: { episodes: Episode[] } } = store.getState();

  TrackPlayer.setupPlayer({ backBuffer: 15, minBuffer: 15 }).then(async () => {
    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });

    await TrackPlayer.reset();
    await TrackPlayer.add(episodesToQueue(episodes));
    await TrackPlayer.skip(id);

    if (autoPlay) {
      TrackPlayer.play();
    }

    AsyncStorage.getItem(`progress_${id}`)
      .then((savedPosition) => TrackPlayer.seekTo(Number(savedPosition)))
      .catch(() => {});
  });
}

export async function playbackService() {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

  TrackPlayer.addEventListener('remote-stop', () => {
    TrackPlayer.destroy();
    AsyncStorage.setItem('last_playing', '');
  });

  TrackPlayer.addEventListener(
    'playback-track-changed',
    ({
      track,
      position,
      nextTrack,
    }: {
      track: string,
      position: number,
      nextTrack: string,
    }) => {
      nextTrack && AsyncStorage.setItem('last_playing', `${nextTrack}`);

      getDuration().then((duration) => {
        if (Math.floor(duration) === Math.floor(position)) {
          AsyncStorage.removeItem(`progress_${track}`);
          AsyncStorage.getItem('finished', (finished) => {
            const finishedEpisodes: string[] = JSON.parse(finished);
            finishedEpisodes.push(track);
            AsyncStorage.setItem('finished', JSON.stringify(finishedEpisodes));
          });
        }
      });
    },
  );

  TrackPlayer.addEventListener(
    'playback-queue-ended',
    ({ track, position }: { track: string, position: number }) => {
      getDuration().then((duration) => {
        if (Math.floor(duration) === Math.floor(position)) {
          AsyncStorage.removeItem('last_playing');
        }
      });
    },
  );

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
