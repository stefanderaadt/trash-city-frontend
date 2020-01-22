/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import ILayer from './ILayer';
import game from '../Game';
import IConfigGameObject from '../gameObjects/IConfigGameObject';
import IGameObject from '../gameObjects/IGameObject';
import { GameEventIds } from '../../enums';
import WaterTile from '../gameObjects/objects/WaterTile';
import FilterSystem from '../gameObjects/objects/FilterSystem';
import BoxCollider from '../BoxCollider';
import CleanerSpawnPoint from '../gameObjects/objects/CleanerSpawnPoint';

class GameObjectLayer implements ILayer {
  public container: PIXI.Container;

  private gameObjects: IConfigGameObject[];
  private height: number;
  private width: number;
  private tileSize: number;

  private activeGameObjects: IGameObject[] = [];

  constructor({ gameObjects, height, width, tileSize, civilianSpawnDelay, civilianSpawnChance }) {
    this.gameObjects = gameObjects;
    this.height = height;
    this.width = width;
    this.tileSize = tileSize;

    this.container = new PIXI.Container();
    game.game.stage.addChild(this.container);

    // Spawn gameobjects defined in Tiled
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        const objectId = game.currentLevel.eventsMap.tiles[y * this.width + x];

        if (objectId && objectId === GameEventIds.CivilianSpawnPoint) {
          const object = game.gameObjectFactory.create({
            name: 'CivilianSpawnPoint',
            x: x * this.tileSize + this.tileSize / 2,
            y: y * this.tileSize + this.tileSize / 2,
            spawnDelay: civilianSpawnDelay,
            spawnChance: civilianSpawnChance
          });

          const sprite = object.init() as PIXI.Sprite | PIXI.AnimatedSprite;
          if (sprite) this.container.addChild(sprite);

          this.activeGameObjects.push(object);
        }

        if (objectId && objectId === GameEventIds.WaterTile) {
          const object = game.gameObjectFactory.create({
            name: 'WaterTile',
            x: x * this.tileSize + this.tileSize / 2,
            y: y * this.tileSize + this.tileSize / 2,
            tileX: x,
            tileY: y,
            tileSize: this.tileSize
          });

          const sprite = object.init() as PIXI.Sprite | PIXI.AnimatedSprite;
          if (sprite) this.container.addChild(sprite);

          this.activeGameObjects.push(object);
        }

        if (objectId && objectId === GameEventIds.FilterSystem) {
          const object = game.gameObjectFactory.create({
            name: 'FilterSystem',
            x: x * this.tileSize + this.tileSize / 2,
            y: y * this.tileSize + this.tileSize / 2
          });

          const sprite = object.init() as PIXI.Sprite | PIXI.AnimatedSprite;
          if (sprite) this.container.addChild(sprite);

          this.activeGameObjects.push(object);
        }

        if (objectId && objectId === GameEventIds.CleanerSpawnPoint) {
          const object = game.gameObjectFactory.create({
            name: 'CleanerSpawnPoint',
            x: x * this.tileSize + this.tileSize / 2,
            y: y * this.tileSize + this.tileSize / 2
          });

          const sprite = object.init() as PIXI.Sprite | PIXI.AnimatedSprite;
          if (sprite) this.container.addChild(sprite);

          this.activeGameObjects.push(object);
        }
      }
    }

    // Spawn gameobjects defined in level.json
    this.gameObjects.forEach(gameObject => {
      const object: IGameObject = game.gameObjectFactory.create({
        name: gameObject.name,
        ...gameObject.props
      });

      const sprite = object.init() as PIXI.Sprite | PIXI.AnimatedSprite;
      if (sprite) this.container.addChild(sprite);

      this.activeGameObjects.push(object);
    });
  }

  public update = (): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      this.activeGameObjects[i].update();
    }
  };

  public render = (): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      this.activeGameObjects[i].render();
    }
  };

  public pause = (): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      this.activeGameObjects[i].pause();
    }
  };

  public resume = (): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      this.activeGameObjects[i].resume();
    }
  };

  public setWaterDirty = (isDirty: boolean): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      if (WaterTile.isWaterTile(this.activeGameObjects[i])) {
        const waterTile = this.activeGameObjects[i] as WaterTile;
        waterTile.setIsDirty(isDirty);
      }
    }
  };

  public repairFilter = (otherBoxCollider: BoxCollider): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      if (FilterSystem.isFilterSystem(this.activeGameObjects[i])) {
        const filterSystem = this.activeGameObjects[i] as FilterSystem;
        if (filterSystem.boxCollider.isInRadius(otherBoxCollider, 20)) {
          filterSystem.activateFilter();
        }
      }
    }
  };

  public filterExists = (): boolean => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      if (FilterSystem.isFilterSystem(this.activeGameObjects[i])) {
        return true;
      }
    }

    return false;
  };

  public filterActive = (): boolean => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      if (FilterSystem.isFilterSystem(this.activeGameObjects[i])) {
        const filterSystem = this.activeGameObjects[i] as FilterSystem;
        return filterSystem.filterActive;
      }
    }

    return true;
  };

  public spawnCleaner = (otherBoxCollider: BoxCollider): void => {
    for (let i = 0; i < this.activeGameObjects.length; i += 1) {
      if (CleanerSpawnPoint.isCleanerSpawnPoint(this.activeGameObjects[i])) {
        const cleanerSpawnPoint = this.activeGameObjects[i] as CleanerSpawnPoint;

        if (cleanerSpawnPoint.boxCollider.isInRadius(otherBoxCollider, 20)) {
          cleanerSpawnPoint.spawnCleaner();
        }
      }
    }
  };
}

export default GameObjectLayer;
