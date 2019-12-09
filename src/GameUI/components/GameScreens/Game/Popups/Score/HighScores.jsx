import React from 'react';

import Button from '../../../../Default/Button';
import TextInput from '../../../../Default/TextInput';
import displayTime from '../../../../../../utils/displayTime';

const HighScores = ({
  setScoreName,
  saveHighScore,
  score: { scoreName, highScores, fetchingHighScores, fetchedHighScores, savingScore, savedScore },
  time
}) => {
  if (fetchingHighScores) {
    return <i className="icon-busy icon-hour-glass" />;
  }

  if (!fetchedHighScores) {
    return null;
  }

  return (
    <div className="score-popup-scores">
      <div className="score-popup-highscores">
        <h2>Beste tijden</h2>
        {highScores.map((highScore, key) => (
          <p key={highScore.id}>
            {`${key + 1}: ${highScore.name} - ${displayTime(highScore.score)}`}
          </p>
        ))}
      </div>
      {(highScores.length < 5 || time < highScores[highScores.length - 1].score) && (
        <div className="score-popup-save">
          <p>Je hebt een top 5 tijd!</p>
          <TextInput
            className="popup-score-name-input"
            type="text"
            placeholder="Naam"
            value={scoreName}
            onChange={e => setScoreName(e.target.value)}
          />
          <Button
            className="popup-button-save-highscore"
            onClick={saveHighScore}
            busy={savingScore}
            disabled={savedScore}
          >
            Score opslaan
          </Button>
        </div>
      )}
    </div>
  );
};

export default HighScores;
