/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import store from '../store';
import { setScreen } from '../actions/appActions';
import { Screens, Popups } from '../enums';
import GameLoop from './GameLoop';
import levels from './levels/levels';
import IConfigLevel from './levels/IConfigLevel';
import AssetLoader from './AssetLoader';
import GameObjectFactory from './GameObjectFactory';
import Level from './Level';
import InputHandler from './InputHandler';
import SoundManager from './SoundManager';

import {
  pauseGame,
  resumeGame,
  setTime,
  setScore,
  setCoins,
  showPopup,
  hidePopup
} from '../actions/gameActions';
import { levelInit } from '../actions/levelActions';

const size = [960, 512];
const fps = 60;

class Game {
  public gameLoop: GameLoop;
  public game: PIXI.Application;
  public assetLoader: AssetLoader;
  public gameObjectFactory: GameObjectFactory;
  public currentLevel: Level;
  public inputHandler: InputHandler;
  public soundManager: SoundManager;
  public coins: number = 0;

  public async init(): Promise<void> {
    const gameId = document.getElementById('game');

    this.game = new PIXI.Application({
      backgroundColor: 0x1099bb
    });

    // PIXI Settings
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // Display pixelart correctly

    // Auto resize window
    this.resize();
    window.addEventListener('resize', this.resize);

    // Append game canvas to html element with '#game'
    if (gameId) gameId.appendChild(this.game.view);

    this.assetLoader = new AssetLoader();
    await this.assetLoader.init();

    this.gameObjectFactory = new GameObjectFactory();

    this.inputHandler = new InputHandler();

    this.soundManager = new SoundManager();

    this.gameLoop = new GameLoop(fps, this.loop);
  }

  // Picked level from front-end
  public pickLevel = (id: number): void => {
    this.gameLoop.reset();

    // Set front-end screen to game
    store.dispatch(setScreen(Screens.Game));
    // Tell front-end that the game has started
    store.dispatch(resumeGame());

    // Get level config by given id
    const foundLevel: IConfigLevel = levels.find(l => l.id === id) as IConfigLevel;

    // Create new level
    this.currentLevel = new Level();
    // Initialize level and pass level config
    this.currentLevel.init(foundLevel);

    // Clear coins
    this.setCoins(0);

    // Save level data to front-end and display info popup
    store.dispatch(
      levelInit({ name: foundLevel.name, goal: foundLevel.goal, levelId: foundLevel.id })
    );
  };

  // Hide info popup and start game
  public startGame = (): void => {
    store.dispatch(hidePopup());
    this.gameLoop.start();
  };

  // Pause all layers/objects and display pause popup
  public pause = (): void => {
    this.gameLoop.pause();
    this.currentLevel.pause();
    store.dispatch(pauseGame());
  };

  // Resume all layers/objects and hide pause popup
  public resume = (): void => {
    this.gameLoop.start();
    this.currentLevel.resume();
    store.dispatch(resumeGame());
  };

  // Update score to front-end
  public setScore = (score: number): void => {
    store.dispatch(setScore(score));

    // Show score popup when the user reached 100%
    if (score >= 100) {
      this.pause();
      store.dispatch(showPopup(Popups.Score));
    }
  };

  // Get current game score
  public getScore = (): number => {
    return store.getState().game.score;
  };

  // Add coins to the current players coins
  public addCoins = (coins): void => {
    this.setCoins(this.coins + coins);
  };

  // Remove coins from the current player coins
  public removeCoins = (coins): void => {
    this.setCoins(this.coins - coins);
  };

  // Update variable and send action to UI
  public setCoins = (coins): void => {
    this.coins = coins;
    store.dispatch(setCoins(coins));
  };

  private loop = (frame: number): void => {
    // Loop callback from GameLoop
    this.update(frame);
    this.render();
  };

  private update = (frame): void => {
    // Update level
    this.currentLevel.update();

    // Update time every second
    if (frame % fps === 0) {
      store.dispatch(setTime(frame / fps));
    }
  };

  private render = (): void => {
    // Render level
    this.currentLevel.render();
  };

  // Update canvas content position after resize
  private resize = (): void => {
    const vpw: number = window.innerWidth;
    const vph: number = window.innerHeight;
    let nvw: number;
    let nvh: number;

    if (vph / vpw < size[1] / size[0]) {
      nvh = vph;
      nvw = (nvh * size[0]) / size[1];
    } else {
      nvw = vpw;
      nvh = (nvw * size[1]) / size[0];
    }

    this.game.renderer.resize(nvw, nvh);

    this.game.stage.scale.set(nvw / size[0], nvh / size[1]);
  };
}

// Only create one game instance
export default new Game();
