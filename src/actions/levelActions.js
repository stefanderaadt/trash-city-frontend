import { Popups } from '../enums.ts';
import { showPopup } from './gameActions';

function setLevelData(level) {
  return {
    type: 'SET_LEVEL_DATA',
    payload: level
  };
}

export const levelInit = level => {
  return dispatch => {
    dispatch(setLevelData(level));
    dispatch(showPopup(Popups.Info));
  };
};
