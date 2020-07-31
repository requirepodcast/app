function reducer(
  state = {
    queuePosition: null,
    isPlaying: false,
    isPaused: true,
  },
  action,
) {
  switch (action.type) {
    case 'PLAY_EPISODE':
      return {
        ...state,
        queuePosition: action.queuePosition,
        isPlaying: true,
        isPaused: false,
      };
    case 'RESUME_PLAYING':
      return {...state, isPaused: false};
    case 'PAUSE_PLAYING':
      return {...state, isPaused: true};
    default:
      return state;
  }
}

export default reducer;
