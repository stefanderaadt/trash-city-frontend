/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import ILayer from './ILayer';
import game from '../Game';
import { TileLayers, Flags } from '../../enums';

class TileLayer implements ILayer {
  public container: PIXI.Container;

  private layers: number;
  private width: number;
  private height: number;
  private tileMapLayers: number[][];
  private tileMap: PIXI.Sprite[][];
  private tileset: string;
  private tileSize: number;

  constructor({ layers, width, height, tileMapLayers, tileset, tileSize }) {
    this.layers = layers;
    this.width = width;
    this.height = height;
    this.tileMapLayers = tileMapLayers;
    this.tileMap = new Array(this.layers).fill([]);
    this.tileset = tileset;
    this.tileSize = tileSize;

    // Create container (layer) and add it to the main PIXI stage
    this.container = new PIXI.Container();
    game.game.stage.addChild(this.container);

    // Loop through all layers and tiles and spawn sprite on level screen
    for (let l = 0; l < this.layers; l += 1) {
      for (let y = 0; y < this.height; y += 1) {
        for (let x = 0; x < this.width; x += 1) {
          // Get tile rotations with hex flags
          let tileId = this.tileMapLayers[l][y * this.width + x];
          let rotation = 0;

          // Check if the sprite is rotated in any angle
          const flippedHorizontally = tileId & Flags.FlippedHorizontally;
          const flippedVertically = tileId & Flags.FlippedVertically;
          const flippedDiagonally = tileId & Flags.FlippedDiagonally;

          // Set the right angle in radians based on 'flipped' booleans from above
          if (flippedVertically && flippedDiagonally) {
            // 270 deg
            rotation = Math.PI * 1.5;
          } else if (flippedHorizontally && flippedVertically) {
            // 180 deg
            rotation = Math.PI;
          } else if (flippedHorizontally && flippedDiagonally) {
            // 90 deg
            rotation = Math.PI * 0.5;
          }

          // Remove flags from tileId to get the actual tileId
          tileId &= ~(
            Flags.FlippedHorizontally |
            Flags.FlippedVertically |
            Flags.FlippedDiagonally
          );

          if (tileId) {
            const texture = game.assetLoader.getAssetByMapId({
              tileset: this.tileset,
              mapId: tileId - 1
            }); // Get texture by tileId

            const sprite = new PIXI.Sprite(texture);
            sprite.x = x * this.tileSize + this.tileSize / 2; // add pivot to position and multiply by tileSize
            sprite.y = y * this.tileSize + this.tileSize / 2; // add pivot to position and multiply by tileSize
            sprite.pivot.x = this.tileSize / 2; // Set center of rotation to the center of the sprite
            sprite.pivot.y = this.tileSize / 2; // Set center of rotation to the center of the sprite
            sprite.rotation = rotation; // Set found rotation
            this.container.addChild(sprite);
            this.tileMap[l][y * this.width + x] = sprite;
          }
        }
      }
    }
  }

  public update = (): void => {};

  public render = (): void => {
    // Re-render all tiles every loop
    for (let l = 0; l < this.layers; l += 1) {
      for (let y = 0; y < this.height; y += 1) {
        for (let x = 0; x < this.width; x += 1) {
          if (this.tileMap[l][y * this.width + x]) {
            this.tileMap[l][y * this.width + x].x = x * this.tileSize + this.tileSize / 2;
            this.tileMap[l][y * this.width + x].y = y * this.tileSize + this.tileSize / 2;
          }
        }
      }
    }
  };

  public pause = (): void => {};

  public resume = (): void => {};
}

export default TileLayer;
