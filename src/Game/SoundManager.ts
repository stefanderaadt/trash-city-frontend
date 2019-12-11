import * as PIXI from 'pixi.js';

import game from './Game';
import store from '../store';

class SoundManager {
  public sounds = {};

  constructor() {}

  // Load set volume and play sound
  public playSound = (id): void => {
    const {
      settings: { volume }
    } = store.getState();

    if (!volume) return;

    if (!(id in this.sounds)) {
      this.sounds[id] = game.assetLoader.getSoundById({ id });
    }

    const sound = this.sounds[id] as PIXI.sound.Sound;
    sound.volume = volume;
    sound.play();
  };
}

export default SoundManager;
