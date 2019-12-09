import React from 'react';
import { connect } from 'react-redux';

import { setScreen } from '../../../../../actions/appActions';
import { setScoreName, saveHighScore } from '../../../../../actions/scoreActions';
import { Popups } from '../../../../../enums.ts';

import Pause from './Pause';
import Score from './Score';
import Info from './Info';

@connect(
  state => ({
    game: state.game,
    level: state.level,
    score: state.score
  }),
  dispatch => ({
    dispatch
  })
)
class GamePopups extends React.Component {
  setScreen = screen => {
    const { dispatch } = this.props;
    dispatch(setScreen(screen));
  };

  setScoreName = name => {
    const { dispatch } = this.props;
    dispatch(setScoreName(name));
  };

  saveHighScore = () => {
    const { dispatch } = this.props;
    dispatch(saveHighScore());
  };

  render() {
    const { game, level, score } = this.props;

    switch (game.currentPopup) {
      case Popups.Pause:
        return <Pause setScreen={this.setScreen} />;
      case Popups.Score:
        return (
          <Score
            setScreen={this.setScreen}
            game={game}
            score={score}
            setScoreName={this.setScoreName}
            saveHighScore={this.saveHighScore}
          />
        );
      case Popups.Info:
        return <Info level={level} />;
      default:
        return null;
    }
  }
}

export default GamePopups;
