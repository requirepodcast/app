function reducer(state = {episodes: []}, action) {
  switch (action.type) {
    case 'EPISODES':
      return {...state, episodes: action.episodes};
    default:
      return state;
  }
}

export default reducer;
