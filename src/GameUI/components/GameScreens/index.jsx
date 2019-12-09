import React from 'react';

import { Screens } from '../../../enums.ts';

import LoadingScreen from './LoadingScreen';
import MainMenu from './MainMenu';
import SettingsMenu from './SettingsMenu';
import LevelMenu from './LevelMenu';
import Game from './Game';
import ControlsMenu from './ControlsMenu';

const GameScreens = ({ activeScreen }) => {
  let screen = null;

  if (activeScreen === Screens.Loading) {
    screen = <LoadingScreen />;
  }

  if (activeScreen === Screens.MainMenu) {
    screen = <MainMenu />;
  }

  if (activeScreen === Screens.LevelMenu) {
    screen = <LevelMenu />;
  }

  if (activeScreen === Screens.SettingsMenu) {
    screen = <SettingsMenu />;
  }

  if (activeScreen === Screens.ControlsMenu) {
    screen = <ControlsMenu />;
  }

  if (activeScreen === Screens.Game) {
    return <Game />;
  }

  return <div className="game-screen">{screen}</div>;
};

export default GameScreens;
