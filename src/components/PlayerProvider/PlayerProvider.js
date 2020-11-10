import React, { createContext, useContext, useRef, useState } from 'react';
import Video from 'react-native-video';
import EpisodeProgressService from '../../services/EpisodeProgressService';

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

  const ref = useRef();

  function play({
    episode: { audioUrl, title: episodeTitle, slug: episodeSlug },
    autoPlay: autoPlayAudio = true,
  }) {
    setLoaded(false);
    setPlaying(true);
    setUrl(audioUrl);
    setTitle(episodeTitle);
    setSlug(episodeSlug);
    setPaused(true);
    setTime(-1);
    setProgress(-1);
    setDuration(-1);

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
  }

  function seek(t) {
    ref.current.seek(t);
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
        <Video
          audioOnly={true}
          playInBackground={true}
          source={{ uri: url }}
          paused={paused}
          onProgress={onProgress}
          onLoad={onLoad}
          ref={ref}
        />
      )}
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
