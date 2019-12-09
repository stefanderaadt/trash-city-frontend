import { Popups } from '../enums.ts';
import { fetchHighScores } from './scoreActions';

export const setScore = score => ({
  type: 'SET_SCORE',
  payload: score
});

export const setTime = time => ({
  type: 'SET_TIME',
  payload: time
});

const pauseGameAction = () => ({
  type: 'PAUSE_GAME'
});

const showPopupAction = popup => ({
  type: 'SHOW_POPUP',
  payload: popup
});

export function showPopup(popup) {
  return dispatch => {
    if (popup === Popups.Score) dispatch(fetchHighScores());
    dispatch(showPopupAction(popup));
  };
}

export const pauseGame = () => {
  return dispatch => {
    dispatch(pauseGameAction());
    dispatch(showPopup(Popups.Pause));
  };
};

const resumeGameAction = () => ({
  type: 'RESUME_GAME'
});

export const hidePopup = () => ({
  type: 'HIDE_POPUP'
});

export const resumeGame = () => {
  return dispatch => {
    dispatch(resumeGameAction());
    dispatch(hidePopup());
  };
};
