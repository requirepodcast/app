import React, { createContext, useContext, useRef, useState } from 'react';
import Sound from 'react-native-video';
import EpisodeProgressService from '../../services/EpisodeProgressService';
import { useLastPlayed } from '../../utils/useLastPlayed';

const initialState = {
  playing: false,
  paused: true,
  url: '',
  title: '',
  slug: '',
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
  const [url, setUrl] = useState(initialState.url);
  const [title, setTitle] = useState(initialState.title);
  const [slug, setSlug] = useState(initialState.slug);
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

  function play({
    episode: { audioUrl, title: episodeTitle, slug: episodeSlug },
    autoPlay: autoPlayAudio = true,
  }) {
    setLoaded(false);
    setUrl(audioUrl);
    setTitle(episodeTitle);
    setSlug(episodeSlug);
    setPaused(true);
    setTime(-1);
    setProgress(-1);
    setDuration(-1);
    setPlaying(true);

    setAutoPlay(autoPlayAudio);
  }

  function trigger() {
    if (playing) {
      setPaused(prev => !prev);
    }
  }

  function onProgress({ currentTime }) {
    setTime(currentTime);
    setProgress(currentTime / duration);

    EpisodeProgressService.saveProgress(slug, currentTime);
  }

  async function onLoad({ duration: audioDuration, currentTime }) {
    setDuration(audioDuration);
    setTime(currentTime);
    setProgress(currentTime / audioDuration);

    const savedTime = await EpisodeProgressService.getProgress(slug);
    seekTo(Number(savedTime));

    setLoaded(true);
    autoPlay && setPaused(false);

    setAutoPlay(true);

    EpisodeProgressService.lastPlayed.set(slug);
  }

  function onEnd() {
    setPlaying(initialState.playing);
    setPaused(initialState.paused);
    setUrl(initialState.url);
    setTitle(initialState.title);
    setSlug(initialState.slug);
    setDuration(initialState.duration);
    setTime(initialState.time);
    setProgress(initialState.progress);
    setLoaded(initialState.loaded);
    setAutoPlay(true);

    EpisodeProgressService.lastPlayed.clean();
  }

  function seek(t) {
    playerRef.current.seek(t);
    setTime(t);
    setProgress(t / duration);
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
        url,
        title,
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
          source={{ uri: url }}
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
