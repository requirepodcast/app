import React, { createContext, useContext, useState } from 'react';
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

  function play({ url: episodeUrl, title: episodeTitle }) {
    setPlaying(true);
    setUrl(episodeUrl);
    setTitle(episodeTitle);
    setPaused(false);
  }

  function trigger() {
    setPaused(prev => !prev);
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

  return (
    <PlayerContext.Provider
      value={{ playing, paused, url, title, duration, time, progress, play, trigger }}
    >
      {playing && (
        <Video
          audioOnly={true}
          playInBackground={true}
          source={{ uri: url }}
          paused={paused}
          onProgress={onProgress}
          onLoad={onLoad}
        />
      )}
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
