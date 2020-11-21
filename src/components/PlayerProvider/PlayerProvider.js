import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Sound from 'react-native-video';
import AudioControl from 'react-native-music-control';
import EpisodeProgressService from '../../services/EpisodeProgressService';
import { useLastPlayed } from '../../utils/useLastPlayed';

// Audio controls
AudioControl.enableControl('play', true);
AudioControl.enableControl('pause', true);
AudioControl.enableControl('stop', false);
AudioControl.enableControl('seek', true);
AudioControl.enableControl('remoteVolume', false);
AudioControl.enableControl('changePlaybackPosition', true);

const initialState = {
  playing: false,
  paused: true,
  episodeMeta: {
    title: '',
    slug: '',
    url: '',
    description: '',
  },
  duration: -1,
  time: -1,
  progress: -1,
  play: () => {},
  trigger: () => {},
  seekBy: () => {},
  loaded: false,
};

const PlayerContext = createContext(initialState);

export function usePlayer() {
  return useContext(PlayerContext);
}

function PlayerProvider({ children }) {
  const [playing, setPlaying] = useState(initialState.playing);
  const [paused, setPaused] = useState(initialState.paused);
  const [episodeMeta, setEpisodeMeta] = useState(initialState.episodeMeta);
  const [duration, setDuration] = useState(initialState.duration);
  const [time, setTime] = useState(initialState.time);
  const [progress, setProgress] = useState(initialState.progress);
  const [loaded, setLoaded] = useState(initialState.loaded);
  const [autoPlay, setAutoPlay] = useState(true);
  const playerRef = useRef();

  useLastPlayed(episode => {
    play({
      episode,
      autoPlay: false,
    });
  });

  useEffect(() => {
    !playing && AudioControl.resetNowPlaying();

    AudioControl.enableBackgroundMode(true);
    AudioControl.handleAudioInterruptions(true);

    AudioControl.on('play', () => {
      if (playing) {
        AudioControl.updatePlayback({ state: AudioControl.STATE_PLAYING });
        playing && setPaused(false);
      }
    });
    AudioControl.on('pause', () => {
      if (playing) {
        AudioControl.updatePlayback({ state: AudioControl.STATE_PAUSED });
        setPaused(true);
      }
    });
    AudioControl.on('seek', t => playing && seek(t));
  }, [playing]);

  function play({
    episode: { audioUrl: url, title, slug, shortDescription: description },
    autoPlay: autoPlayAudio = true,
  }) {
    setLoaded(false);
    setEpisodeMeta({
      url,
      title,
      slug,
      description,
    });
    setPaused(true);
    setTime(-1);
    setProgress(-1);
    setDuration(-1);
    setPlaying(true);

    setAutoPlay(autoPlayAudio);
  }

  function trigger() {
    if (playing) {
      AudioControl.updatePlayback({
        state: paused ? AudioControl.STATE_PLAYING : AudioControl.STATE_PAUSED,
      });
      setPaused(prev => !prev);
    }
  }

  function onProgress({ currentTime }) {
    setTime(currentTime);
    setProgress(currentTime / duration);

    AudioControl.updatePlayback({ elapsedTime: currentTime });

    EpisodeProgressService.saveProgress(episodeMeta.slug, currentTime);
  }

  async function onLoad({ duration: audioDuration, currentTime }) {
    setDuration(audioDuration);
    setTime(currentTime);
    setProgress(currentTime / audioDuration);

    const savedTime = await EpisodeProgressService.getProgress(episodeMeta.slug);
    seekTo(Number(savedTime));

    AudioControl.setNowPlaying({
      title: episodeMeta.title,
      artwork: require('../../images/RequireLogo.png'),
      artist: 'Require Podcast',
      genre: 'Podcast',
      duration,
      description: episodeMeta.description,
      color: 0x0f111a,
      colorized: true,
    });

    setLoaded(true);
    autoPlay && setPaused(false);

    setAutoPlay(true);

    EpisodeProgressService.lastPlayed.set(episodeMeta.slug);
  }

  function onEnd() {
    setPlaying(initialState.playing);
    setPaused(initialState.paused);
    setEpisodeMeta(initialState.episodeMeta);
    setDuration(initialState.duration);
    setTime(initialState.time);
    setProgress(initialState.progress);
    setLoaded(initialState.loaded);
    setAutoPlay(true);

    AudioControl.resetNowPlaying();

    EpisodeProgressService.lastPlayed.clean();
  }

  function seek(t) {
    playerRef.current.seek(t);
    setTime(t);
    setProgress(t / duration);
    AudioControl.updatePlayback({ elapsedTime: t });
  }

  function seekBy(t) {
    if (playing) {
      return () => seek(time + t);
    } else {
      return () => {};
    }
  }

  function seekTo(t) {
    if (playing) {
      seek(t);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        playing,
        paused,
        url: episodeMeta.url,
        title: episodeMeta.title,
        duration,
        time,
        progress,
        play,
        trigger,
        seekBy,
        seekTo,
        loaded,
      }}
    >
      {playing && (
        <Sound
          audioOnly={true}
          playInBackground={true}
          source={{ uri: episodeMeta.url }}
          paused={paused}
          onProgress={onProgress}
          onLoad={onLoad}
          ref={playerRef}
          onEnd={onEnd}
        />
      )}
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
