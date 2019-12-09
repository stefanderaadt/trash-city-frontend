import axios from 'axios';

import store from '../store';

export const setScoreName = name => {
  return {
    type: 'SET_SCORE_NAME',
    payload: name
  };
};

const savingScore = () => {
  return {
    type: 'SAVING_SCORE'
  };
};

const savedScore = score => {
  return {
    type: 'SAVED_SCORE',
    payload: score
  };
};

const savingScoreError = () => {
  return {
    type: 'SAVING_SCORE'
  };
};

export const saveHighScore = () => {
  return dispatch => {
    dispatch(savingScore());

    const {
      game: { time: score },
      level: { levelId },
      score: { name }
    } = store.getState();

    const query = `mutation ($input: ScoreInput) {
      setScore(input: $input) {
        id
      }
    }`;

    const input = { name, score, levelId };

    axios
      .post(`${process.env.API_URL}/graphql`, {
        query,
        variables: {
          input
        }
      })
      .then(res => dispatch(savedScore({ ...input, id: res.data.data.setScore.id })))
      .catch(err => dispatch(savingScoreError(err)));
  };
};

const fetchingHighScores = () => {
  return {
    type: 'FETCHING_HIGH_SCORES'
  };
};

const fetchedHighScores = res => {
  return {
    type: 'FETCHED_HIGH_SCORES',
    payload: res.data.data.highScores
  };
};

const fetchingHighScoresError = () => {
  return {
    type: 'FETCHING_HIGH_SCORES_ERROR'
  };
};

export const fetchHighScores = () => {
  return dispatch => {
    dispatch(fetchingHighScores());

    const {
      level: { levelId }
    } = store.getState();

    const query = `query ($levelId: Int!){
      highScores(levelId: $levelId, limit: 5) {
        id
        name
        score
      }
    }`;

    axios
      .post(`${process.env.API_URL}/graphql`, {
        query,
        variables: {
          levelId
        }
      })
      .then(res => {
        dispatch(fetchedHighScores(res));
      })
      .catch(err => dispatch(fetchingHighScoresError(err)));
  };
};
