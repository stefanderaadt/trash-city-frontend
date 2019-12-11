/* eslint-disable import/no-cycle */
import IGameObject from '../IGameObject';
import Position from '../Position';
import BoxCollider from '../../BoxCollider';
import game from '../../Game';
import random from '../../../utils/random';

class FilterSystem implements IGameObject {
  public boxCollider: BoxCollider;
  public filterActive: boolean = true;
  private previousFilterActive: boolean = true;
  private filterBreakDownDuration: number;

  constructor({ x, y }) {
    this.boxCollider = new BoxCollider({ width: 16, height: 16, position: new Position({ x, y }) });
  }

  public init = (): void => {
    // Break down filter within 10 and 120 seconds
    this.filterBreakDownDuration = random(600, 7200);
  };

  public update = (): void => {
    // Disable filter after set 'filterBreakDownDuration'
    if (game.gameLoop.frame > 0 && !(game.gameLoop.frame % this.filterBreakDownDuration)) {
      this.filterActive = false;

      // Play water sound when filtersystem broke down
      game.soundManager.playSound('water');
    }

    // Update water with set filter active state
    if (this.filterActive !== this.previousFilterActive) {
      game.currentLevel.gameObjectLayer.setWaterDirty(!this.filterActive);

      if (this.filterActive) {
        // Reset breakdown duration when fixed 120 to 180 seconds
        this.filterBreakDownDuration = random(7200, 10800);
      }
    }

    this.previousFilterActive = this.filterActive;
  };

  public render = (): void => {};

  public destroy = (): void => {};

  public pause = (): void => {};

  public resume = (): void => {};

  public activateFilter = (): void => {
    // Set filter active
    this.filterActive = true;

    // Play water sound when fixing filtersystem
    game.soundManager.playSound('water');
  };

  // Check if object is an instance of this object (FilterSystem)
  public static isFilterSystem(object: any): object is FilterSystem {
    return 'filterActive' in object;
  }
}

export default FilterSystem;
