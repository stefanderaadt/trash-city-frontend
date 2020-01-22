import { Popups } from '../enums.ts';

const defaultState = {
  active: false,
  currentPopup: Popups.None,
  score: 50,
  coins: 0,
  time: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TIME':
      return {
        ...state,
        time: action.payload
      };
    case 'SET_SCORE':
      return {
        ...state,
        score: action.payload
      };
    case 'SET_COINS':
      return {
        ...state,
        coins: action.payload
      };
    case 'RESUME_GAME':
      return {
        ...state,
        active: true
      };
    case 'PAUSE_GAME':
      return {
        ...state,
        active: false
      };
    case 'SHOW_POPUP':
      return {
        ...state,
        currentPopup: action.payload
      };
    case 'HIDE_POPUP':
      return {
        ...state,
        currentPopup: Popups.None
      };
    default:
      return state;
  }
};
