import React, { createContext, useState } from 'react';
import Video from 'react-native-video';

const initialState = {
  playing: false,
  paused: true,
  url: '',
  title: '',
  duration: 0,
  time: 0,
  progress: 0,
  play: () => {},
};

const PlayerContext = createContext(initialState);

function Player({ children }) {
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

  return (
    <PlayerContext value={{ playing, paused, url, title, duration, time, progress, play }}>
      {playing && (
        <Video audioOnly={true} playInBackground={true} source={{ uri: url }} paused={paused} />
      )}
      {children}
    </PlayerContext>
  );
}

export default Player;
