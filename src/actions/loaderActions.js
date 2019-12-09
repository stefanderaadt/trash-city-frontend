import { Screens } from '../enums.ts';
import { setScreen } from './appActions';

export const startLoading = () => {
  return {
    type: 'START_LOADING'
  };
};

export const onLoading = percentage => {
  return {
    type: 'ON_LOADING',
    payload: percentage
  };
};

const onLoaded = () => {
  return {
    type: 'ON_LOADED'
  };
};

export const loadingCompleted = () => {
  return dispatch => {
    dispatch(onLoaded());
    dispatch(setScreen(Screens.MainMenu));
  };
};
