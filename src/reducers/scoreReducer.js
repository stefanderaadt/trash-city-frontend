import dynamicSort from '../utils/dynamicSort';

const defaultState = {
  name: '',
  savingScore: false,
  savedScore: false,
  highScores: [],
  fetchingHighScores: false,
  fetchedHighScores: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SCORE_NAME':
      return {
        ...state,
        name: action.payload
      };
    case 'SAVING_SCORE':
      return {
        ...state,
        savingScore: true,
        savedScore: false
      };
    case 'SAVED_SCORE':
      const highScores = [...state.highScores, action.payload];
      highScores.sort(dynamicSort('score'));

      if (highScores.length > 5) highScores.pop();

      return {
        ...state,
        savingScore: false,
        savedScore: true,
        highScores
      };
    case 'SAVING_SCORE_ERROR':
      return {
        ...state,
        savingScore: false,
        savedScore: false
      };
    case 'FETCHING_HIGH_SCORES':
      return {
        ...state,
        fetchingHighScores: true,
        fetchedHighScores: false
      };
    case 'FETCHED_HIGH_SCORES':
      return {
        ...state,
        highScores: action.payload,
        fetchingHighScores: false,
        fetchedHighScores: true,
        savedScore: false
      };

    case 'FETCHING_HIGH_SCORES_ERROR':
      return {
        ...state,
        fetchingHighScores: false,
        fetchedHighScores: false
      };
    default:
      return state;
  }
};
