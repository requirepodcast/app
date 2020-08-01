import MusicControl from 'react-native-music-control';

export function setupMusicControl() {
  MusicControl.enableControl('play', true);
  MusicControl.enableControl('pause', true);
  MusicControl.enableControl('stop', false);
  MusicControl.enableControl('nextTrack', false);
  MusicControl.enableControl('previousTrack', false);
  MusicControl.enableControl('changePlaybackPosition', true);
  MusicControl.enableControl('seek', true);
  MusicControl.enableControl('skipForward', false);
  MusicControl.enableControl('skipBackward', false);
}
