function reducer(
  state = {
    queuePosition: null,
    isPlaying: false,
  },
  action,
) {
  switch (action.type) {
    case 'PLAY_EPISODE':
      return {...state, queuePosition: action.queuePosition};
    case 'RESUME_PLAYING':
      return {...state, isPlaying: true};
    case 'PAUSE_PLAYING':
      return {...state, isPlaying: false};
    default:
      return state;
  }
}

export default reducer;
