export function playEpisode(queuePosition) {
  return {
    type: 'PLAY_EPISODE',
    queuePosition,
  };
}

export function resumePlaying() {
  return {type: 'RESUME_PLAYING'};
}

export function pausePlaying() {
  return {type: 'PAUSE_PLAYING'};
}
