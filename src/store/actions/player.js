export function playEpisode(queuePosition) {
  return {
    type: 'PLAY_EPISODE',
    queuePosition,
  };
}

export function resumePlaying() {
  return { type: 'RESUME_PLAYING' };
}

export function pausePlaying() {
  return { type: 'PAUSE_PLAYING' };
}

export function setProgress(val) {
  return { type: 'SET_PROGRESS', progress: val };
}

export function setDuration(val) {
  return { type: 'SET_DURATION', duration: val };
}

export function seekFunc(func) {
  return { type: 'SEEK_FUNC', func };
}

export function seek(to) {
  return { type: 'SEEK', to };
}

export function cleanup() {
  return { type: 'CLEANUP' };
}
