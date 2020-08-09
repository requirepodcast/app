function reducer(
  state = {
    position: 0,
    duration: 0,
    episode: null,
    playbackState: null,
    disabled: true,
    playing: false,
  },
  action,
) {
  switch (action.type) {
    case 'SET_PLAYER_STATE':
      return { ...state, ...action.state };
    default:
      return state;
  }
}

export default reducer;
