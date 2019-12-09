/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import IGameObject from '../IGameObject';
import BoxCollider from '../../BoxCollider';
import Position from '../Position';
import game from '../../Game';
import random from '../../../utils/random';

class Trash implements IGameObject {
  public boxCollider: BoxCollider;
  public id: number;
  public sprite: PIXI.Sprite;

  private type: number;
  private rotation: number;

  constructor({ x, y, id }) {
    this.id = id;
    this.boxCollider = new BoxCollider({ width: 8, height: 8, position: new Position({ x, y }) });
  }

  public init = (): PIXI.Sprite => {
    // Get random trash type
    this.type = random(1, 12);

    // Set random rotation
    this.rotation = random(0, 360) * (Math.PI / 180);

    // Get trash sprite by id
    const texture: PIXI.Texture = game.assetLoader.getAssetById({
      tileset: 'img/sprites/kenney_rpg_urban_city/kenney_rpg_urban_city.json',
      id: `trash_${this.type}.png`
    });

    // Create new Sprite
    const sprite = new PIXI.Sprite(texture);
    sprite.rotation = this.rotation; // Set random rotation
    sprite.x = this.boxCollider.position.x; // Set init position x
    sprite.y = this.boxCollider.position.y; // Set init position y
    sprite.pivot.x = 4; // Set center of rotation to the center of the sprite
    sprite.pivot.y = 4; // Set center of rotation to the center of the sprite
    this.sprite = sprite;

    return this.sprite;
  };

  public update = (): void => {};

  public render = (): void => {
    // Render sprite at right x,y coordinates
    this.sprite.x = this.boxCollider.position.x;
    this.sprite.y = this.boxCollider.position.y;
  };

  public destroy = (): void => {
    // Destroy sprite
    this.sprite.destroy();
  };

  public pause = (): void => {};

  public resume = (): void => {};
}

export default Trash;
