/* eslint-disable import/no-cycle */
import IGameObject from '../IGameObject';
import Position from '../Position';
import BoxCollider from '../../BoxCollider';

import game from '../../Game';

import { GameEventIds } from '../../../enums';

class CivilianSpawnPoint implements IGameObject {
  public boxCollider: BoxCollider;
  private spawnDelay: number;
  private spawnChance: number;

  constructor({ x, y, spawnDelay, spawnChance }) {
    this.boxCollider = new BoxCollider({ width: 16, height: 16, position: new Position({ x, y }) });
    this.spawnDelay = spawnDelay;
    this.spawnChance = spawnChance;
  }

  public init = (): void => {};

  public update = (): void => {
    // Run once every spawnDelay loop set in level config
    if (!(game.gameLoop.frame % this.spawnDelay)) {
      // Spawn a civilian with set spawnChance in level config
      if (Math.random() < this.spawnChance) {
        // Find nearest pavement
        const position = game.currentLevel.eventsMap.nearestEventWithId({
          x: this.boxCollider.position.x,
          y: this.boxCollider.position.y,
          id: GameEventIds.SidewalkArea
        });

        // Spawn civilian on new position
        game.currentLevel.civilianLayer.spawnCivilian(position);
      }
    }
  };

  public render = (): void => {};

  public destroy = (): void => {};

  public pause = (): void => {};

  public resume = (): void => {};
}

export default CivilianSpawnPoint;
