const defaultState = {
  volume: 80
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload
      };

    default:
      return state;
  }
};
