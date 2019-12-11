const localStorageSettings = localStorage.getItem('settings');

const defaultState = localStorageSettings
  ? JSON.parse(localStorageSettings)
  : {
      volume: 1
    };

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_VOLUME': {
      const newState = {
        ...state,
        volume: action.payload
      };
      localStorage.setItem('settings', JSON.stringify(newState));
      return newState;
    }

    default:
      return state;
  }
};
