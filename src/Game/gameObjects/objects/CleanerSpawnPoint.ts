/* eslint-disable import/no-cycle */
import IGameObject from '../IGameObject';
import Position from '../Position';
import BoxCollider from '../../BoxCollider';

import game from '../../Game';

import { GameEventIds } from '../../../enums';

class CleanerSpawnPoint implements IGameObject {
  public boxCollider: BoxCollider;
  private cleanersSpawned: number = 0;
  private spawnPrice: number = 250;

  constructor({ x, y }) {
    this.boxCollider = new BoxCollider({ width: 16, height: 16, position: new Position({ x, y }) });
  }

  public init = (): void => {};

  public update = (): void => {};

  public render = (): void => {};

  public destroy = (): void => {};

  public pause = (): void => {};

  public resume = (): void => {};

  public spawnCleaner = (): void => {
    // Check if the player has enough coins
    if (game.coins < this.spawnPrice) return;

    // Remove coins when enough
    game.removeCoins(this.spawnPrice);

    // Find nearest pavement
    const position = game.currentLevel.eventsMap.nearestEventWithId({
      x: this.boxCollider.position.x,
      y: this.boxCollider.position.y,
      id: GameEventIds.SidewalkArea
    });

    // Spawn cleaner on new position
    game.currentLevel.civilianLayer.spawnCleaner(position);

    // Increase spawn amount
    this.cleanersSpawned++;

    // Play soundeffect after spawning new Cleaner
    game.soundManager.playSound('coin_pickup');
  };

  // Check if object is an instance of this object (CleanerSpawnPoint)
  public static isCleanerSpawnPoint(object: any): object is CleanerSpawnPoint {
    return 'cleanersSpawned' in object;
  }
}

export default CleanerSpawnPoint;
