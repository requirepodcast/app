function reducer(
  state = {
    queuePosition: null,
    isPlaying: false,
    isPaused: true,
    progress: 0,
    duration: 0,
    seekFunc: () => {},
  },
  action,
) {
  switch (action.type) {
    case 'PLAY_EPISODE':
      return state.queuePosition !== action.queuePosition
        ? {
            ...state,
            queuePosition: action.queuePosition,
            isPlaying: true,
            isPaused: false,
            progress: 0,
            duration: 0,
            seekFunc: () => {},
          }
        : {...state};
    case 'RESUME_PLAYING':
      return {...state, isPaused: false};
    case 'PAUSE_PLAYING':
      return {...state, isPaused: true};
    case 'SET_PROGRESS':
      return {...state, progress: action.progress};
    case 'SET_DURATION':
      return {...state, duration: action.duration};
    case 'SEEK_FUNC':
      return {...state, seekFunc: action.func};
    case 'CLEAN':
      return {
        queuePosition: null,
        isPlaying: false,
        isPaused: true,
        progress: 0,
        duration: 0,
        seekFunc: () => {},
      };
    default:
      return state;
  }
}

export default reducer;
