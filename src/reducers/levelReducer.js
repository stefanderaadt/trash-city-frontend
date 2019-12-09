const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_LEVEL_DATA':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
