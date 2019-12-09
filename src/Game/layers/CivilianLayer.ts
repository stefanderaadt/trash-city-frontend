/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import ILayer from './ILayer';
import IGameObject from '../gameObjects/IGameObject';
import game from '../Game';

class CivilianLayer implements ILayer {
  public container: PIXI.Container;

  private civilians: IGameObject[] = [];
  private maxCivilians: number;

  constructor({ maxCivilians }) {
    this.maxCivilians = maxCivilians;

    // Create container (layer) and add it to the main PIXI stage
    this.container = new PIXI.Container();
    game.game.stage.addChild(this.container);
  }

  public update = (): void => {
    // Call update function for every civilian gameObject
    for (let i = 0; i < this.civilians.length; i += 1) {
      this.civilians[i].update();
    }
  };

  public render = (): void => {
    // Call render function for every civilian gameObject
    for (let i = 0; i < this.civilians.length; i += 1) {
      this.civilians[i].render();
    }
  };

  public pause = (): void => {
    // Call pause function for every civilian gameObject
    for (let i = 0; i < this.civilians.length; i += 1) {
      this.civilians[i].pause();
    }
  };

  public resume = (): void => {
    // Call resume function for every civilian gameObject
    for (let i = 0; i < this.civilians.length; i += 1) {
      this.civilians[i].resume();
    }
  };

  public spawnCivilian = ({ x, y }): void => {
    if (this.civilians.length >= this.maxCivilians) return; // Don't spawn civilian when set limit is reached

    // Spawn civilian with gameObjectFactory
    const civilian: IGameObject = game.gameObjectFactory.create({
      name: 'Civilian',
      x,
      y
    });

    // Get sprite from gameObject and add to layer
    const sprite = civilian.init() as PIXI.Sprite | PIXI.AnimatedSprite;
    if (sprite) this.container.addChild(sprite);

    // Add gameObject to array of existing gameObjects
    this.civilians.push(civilian);
  };
}

export default CivilianLayer;
