import React, { createContext, useContext, useRef, useState } from 'react';
import Video from 'react-native-video';

const initialState = {
  playing: false,
  paused: true,
  url: '',
  title: '',
  duration: -1,
  time: -1,
  progress: -1,
  play: () => {},
  trigger: () => {},
  seekBy: () => {},
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
  const [duration, setDuration] = useState(initialState.duration);
  const [time, setTime] = useState(initialState.time);
  const [progress, setProgress] = useState(initialState.progress);
  const ref = useRef();

  function play({ url: episodeUrl, title: episodeTitle }) {
    setPlaying(true);
    setUrl(episodeUrl);
    setTitle(episodeTitle);
    setPaused(false);
    setTime(-1);
    setProgress(-1);
    setDuration(-1);
  }

  function trigger() {
    if (playing) {
      setPaused(prev => !prev);
    }
  }

  function onProgress({ currentTime }) {
    setTime(currentTime);
    setProgress(currentTime / duration);
  }

  function onLoad({ duration: audioDuration, currentTime }) {
    setDuration(audioDuration);
    setTime(currentTime);
    setProgress(currentTime / audioDuration);
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
