import { Screens } from '../enums.ts';

const defaultState = {
  activeScreen: Screens.Loading
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SCREEN':
      return {
        ...state,
        activeScreen: action.payload
      };

    default:
      return state;
  }
};
