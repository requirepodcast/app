const initialState = {
  playing: false,
  duration: 0,
  time: 0,
  progress: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'TRIGGER':
      return { ...state, playing: !state.playing };
    case 'DURATION':
      return { ...state, duration: action.duration };
    case 'PROGRESS':
      return { ...state, time: action.time, progress: action.time / state.duration };
    case 'STOP':
      return initialState;
    default:
      return state;
  }
}

export default reducer;
