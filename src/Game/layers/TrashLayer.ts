/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import ILayer from './ILayer';
import IGameObject from '../gameObjects/IGameObject';
import game from '../Game';
import BoxCollider from '../BoxCollider';
import Trash from '../gameObjects/objects/Trash';
import { GameEventIds } from '../../enums';
import random from '../../utils/random';

const pickupSoundsCount = 6;

class TrashLayer implements ILayer {
  public container: PIXI.Container;
  public trash: IGameObject[] = [];

  private index: number = 0;
  private initialTrashAmount: number;
  private trashSpawnChance: number;
  private trashMaxSpawnChance: number;
  private trashIncreaseSpawnChance: number;
  private trashSpawnIncreaseDelay: number;
  private maxTrash: number;

  constructor({
    initialTrashAmount,
    trashSpawnChance,
    trashMaxSpawnChance,
    trashIncreaseSpawnChance,
    trashSpawnIncreaseDelay,
    maxTrash
  }) {
    this.initialTrashAmount = initialTrashAmount;
    this.trashSpawnChance = trashSpawnChance;
    this.trashMaxSpawnChance = trashMaxSpawnChance;
    this.trashIncreaseSpawnChance = trashIncreaseSpawnChance;
    this.trashSpawnIncreaseDelay = trashSpawnIncreaseDelay;
    this.maxTrash = maxTrash;

    // Create container (layer) and add it to the main PIXI stage
    this.container = new PIXI.Container();
    game.game.stage.addChild(this.container);

    // Spawn random trash on level based on config amount
    for (let i = 0; i < this.initialTrashAmount; i += 1) {
      const position = game.currentLevel.eventsMap.getRandomTileById(GameEventIds.SidewalkArea);
      this.spawnTrash(position.x, position.y);
    }
  }

  public update = (): void => {
    // Call update function for every trash gameObject
    for (let i = 0; i < this.trash.length; i += 1) {
      this.trash[i].update();
    }
  };

  public render = (): void => {
    // Call render function for every trash gameObject
    for (let i = 0; i < this.trash.length; i += 1) {
      this.trash[i].render();
    }
  };

  public pause = (): void => {
    // Call pause function for every trash gameObject
    for (let i = 0; i < this.trash.length; i += 1) {
      this.trash[i].pause();
    }
  };

  public resume = (): void => {
    // Call resume function for every trash gameObject
    for (let i = 0; i < this.trash.length; i += 1) {
      this.trash[i].resume();
    }
  };

  public trySpawnTrash = (x, y): void => {
    // Spawn trash at set spawnChance
    if (Math.random() < this.trashSpawnChance) {
      this.spawnTrash(x, y);
    }

    // Increase or decrease spawnChance over time (based on config)
    if (
      this.trashSpawnChance < this.trashMaxSpawnChance &&
      !(game.gameLoop.frame % this.trashSpawnIncreaseDelay)
    ) {
      this.trashSpawnChance += this.trashIncreaseSpawnChance;
    }
  };

  // Spawn trash on set position
  private spawnTrash = (x, y): void => {
    if (this.trash.length >= this.maxTrash) return; // Don't spawn trash when limit is reached

    // Create new trash gameObject with factory
    const trash: IGameObject = game.gameObjectFactory.create({
      name: 'Trash',
      x,
      y,
      id: this.index += 1
    });

    // Get sprite from gameObject and add to layer
    const sprite = trash.init() as PIXI.Sprite;
    this.container.addChild(sprite);

    // Add gameObject to array of existing gameObjects
    this.trash.push(trash);
  };

  public pickupTrash(otherBoxCollider: BoxCollider): void {
    const trashIdsInRadius: number[] = [];

    // Find trash gameObjects that are in radius of 'otherBoxCollider'
    for (let i = 0; i < this.trash.length; i += 1) {
      if (this.trash[i].boxCollider.isInRadius(otherBoxCollider, 20)) {
        const trashItem = this.trash[i] as Trash;
        trashIdsInRadius.push(trashItem.id);
      }
    }

    // Play one of the random pickup sounds
    if (trashIdsInRadius.length) {
      game.soundManager.playSound(`trash_pickup${random(1, pickupSoundsCount)}`);
    }

    // Filter and destroy found trash gameObjects from array
    this.trash = this.trash.filter(t => {
      const trashItem = t as Trash;
      if (trashIdsInRadius.includes(trashItem.id)) {
        this.container.removeChild(trashItem.sprite);
        trashItem.destroy();
        return false;
      }

      return true;
    });
  }
}

export default TrashLayer;
