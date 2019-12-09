/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import IGameObject from '../IGameObject';
import Position from '../Position';
import BoxCollider from '../../BoxCollider';
import game from '../../Game';
import { TileLayers } from '../../../enums';

class WaterTile implements IGameObject {
  public boxCollider: BoxCollider;

  private tileX: number;
  private tileY: number;
  private tileSize: number;

  private sprite: PIXI.Sprite;
  private isDirty: boolean = false;

  private texture: PIXI.Texture;
  private textureDirty: PIXI.Texture;

  constructor({ x, y, tileX, tileY, tileSize }) {
    this.boxCollider = new BoxCollider({
      width: tileSize,
      height: tileSize,
      position: new Position({ x, y })
    });

    this.tileX = tileX;
    this.tileY = tileY;
    this.tileSize = tileSize;
  }

  public init = (): PIXI.Sprite => {
    this.texture = game.assetLoader.getAssetById({
      tileset: 'img/sprites/kenney_rpg_urban_city/kenney_rpg_urban_city.json',
      id: 'tile_0198.png'
    }); // Get texture by id

    this.textureDirty = game.assetLoader.getAssetById({
      tileset: 'img/sprites/kenney_rpg_urban_city/kenney_rpg_urban_city.json',
      id: 'tile_0198_dirty.png'
    }); // Get dirty texture by id

    this.sprite = new PIXI.Sprite(this.texture);
    this.sprite.x = this.tileX * this.tileSize + this.tileSize / 2; // add pivot to position and multiply by tileSize
    this.sprite.y = this.tileY * this.tileSize + this.tileSize / 2; // add pivot to position and multiply by tileSize
    this.sprite.pivot.x = this.tileSize / 2; // Set center of rotation to the center of the sprite
    this.sprite.pivot.y = this.tileSize / 2; // Set center of rotation to the center of the sprite

    return this.sprite;
  };

  public update = (): void => {};

  public render = (): void => {
    this.sprite.x = this.tileX * this.tileSize + this.tileSize / 2;
    this.sprite.y = this.tileY * this.tileSize + this.tileSize / 2;
  };

  public destroy = (): void => {
    this.sprite.destroy();
  };

  public pause = (): void => {};

  public resume = (): void => {};

  public setIsDirty = (isDirty: boolean): void => {
    if (isDirty) {
      this.sprite.texture = this.textureDirty;
    } else {
      this.sprite.texture = this.texture;
    }

    this.isDirty = isDirty;
  };

  // Check if object is an instance of this object (WaterTile)
  public static isWaterTile(object: any): object is WaterTile {
    return 'setIsDirty' in object;
  }
}

export default WaterTile;
