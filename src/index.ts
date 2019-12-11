import 'babel-polyfill';
import 'pixi-sound';

import GameUI from './GameUI/index';
import game from './Game/Game';

const gameUI = new GameUI();

gameUI.render();
game.init();
