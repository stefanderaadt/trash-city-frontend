/* eslint-disable import/no-cycle */
import game from './Game';
import TileMap from './TileMap';
import TrashLayer from './layers/TrashLayer';
import TileLayer from './layers/TileLayer';
import GameObjectLayer from './layers/GameObjectLayer';
import CivilianLayer from './layers/CivilianLayer';
import IConfigLevel from './levels/IConfigLevel';
import ILayer from './layers/ILayer';

class Level {
  public tileLayer: TileLayer;
  public trashLayer: TrashLayer;
  public civilianLayer: CivilianLayer;
  public gameObjectLayer: GameObjectLayer;

  private maxTrash: number;
  private minTrashToWin: number;

  private layers: ILayer[];

  public collisionMap: TileMap;
  public eventsMap: TileMap;

  public init = (level: IConfigLevel): void => {
    // Set level properties
    this.maxTrash = level.maxTrash;
    this.minTrashToWin = level.minTrashToWin;

    // Create TileMaps for level
    this.collisionMap = new TileMap({
      tiles: level.collisionMap,
      width: level.width,
      tileSize: level.tileSize
    });
    this.eventsMap = new TileMap({
      tiles: level.objectsMap,
      width: level.width,
      tileSize: level.tileSize
    });

    // Create layers for level
    this.tileLayer = new TileLayer(level);
    this.trashLayer = new TrashLayer(level);
    this.civilianLayer = new CivilianLayer(level);
    this.gameObjectLayer = new GameObjectLayer(level);

    // Add layers to array for easy updates
    this.layers = [this.tileLayer, this.trashLayer, this.civilianLayer, this.gameObjectLayer];
  };

  public update = (): void => {
    // Call update function for all layers
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].update();
    }

    // Update score once every 60 frames (1 second)
    if (!(game.gameLoop.frame % game.gameLoop.fps)) {
      let score;

      if (this.gameObjectLayer.filterExists()) {
        // Get trash and filter scores
        const trashScore = this.calculateTrashScore();
        const filterScore = this.calculateFilterScore();

        // Trash counts for 80% filter counts for 20%
        score = trashScore * 0.8 + filterScore * 0.2;
      } else {
        // Just get the trash score when no filter found
        score = this.calculateTrashScore();
      }

      // Check if score has changed
      if (game.getScore() !== score) {
        // Update game with new score and update front-end
        game.setScore(score);
      }
    }
  };

  public render = (): void => {
    // Call render function for all layers
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].render();
    }
  };

  public pause = (): void => {
    // Call pause function for all layers
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].pause();
    }
  };

  public resume = (): void => {
    // Call resume function for all layers
    for (let i = 0; i < this.layers.length; i += 1) {
      this.layers[i].resume();
    }
  };

  // Calculate trash score with margin: 'minTrashToWin'
  private calculateTrashScore = (): number => {
    if (this.trashLayer.trash.length > this.maxTrash) return 0;
    const score =
      ((this.maxTrash - this.trashLayer.trash.length) *
        (this.maxTrash / (this.maxTrash - this.minTrashToWin))) /
      10;
    return score > 100 ? 100 : score;
  };

  // Calculate filter score
  private calculateFilterScore = (): number => {
    return this.gameObjectLayer.filterActive() ? 100 : 0;
  };
}

export default Level;
