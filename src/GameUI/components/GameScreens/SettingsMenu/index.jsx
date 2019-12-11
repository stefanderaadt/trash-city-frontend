import React from 'react';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider';

import { setVolume } from '../../../../actions/settingsActions';
import { setScreen } from '../../../../actions/appActions';
import { Screens } from '../../../../enums.ts';
import Button from '../../Default/Button';

@connect(
  state => ({
    settings: state.settings
  }),
  dispatch => ({
    dispatch
  })
)
class SettingsMenu extends React.Component {
  setVolume = v => {
    const { dispatch } = this.props;
    dispatch(setVolume(v / 100));
  };

  setScreen = screen => {
    const { dispatch } = this.props;
    dispatch(setScreen(screen));
  };

  render() {
    const {
      settings: { volume }
    } = this.props;

    const volumeValue = volume * 100;

    return (
      <div className="game-screen-content settings-menu">
        <div className="game-screen-item game-screen-title">Opties</div>
        <div className="game-screen-item">
          <span>{`Volume: ${volumeValue}`}</span>
          <Slider
            className="settings-volume-rangeslider"
            value={volumeValue}
            orientation="horizontal"
            onChange={this.setVolume}
            tooltip={false}
            min={0}
            max={100}
            step={1}
          />
        </div>
        <div className="game-screen-item">
          <Button
            className="settings-menu-back-button"
            fullwidth
            onClick={() => this.setScreen(Screens.MainMenu)}
          >
            Terug
          </Button>
        </div>
      </div>
    );
  }
}

export default SettingsMenu;
