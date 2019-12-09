import BoxCollider from './BoxCollider';
import { ObjectDirection } from '../enums';
import Position from './gameObjects/Position';
import random from '../utils/random';

class TileMap {
  public tiles: number[];
  private width: number;
  private tileSize: number;

  constructor({ tiles, width, tileSize }) {
    this.tiles = tiles;
    this.width = width;
    this.tileSize = tileSize;
  }

  // Check if object is gonna collide with tileMap
  public objectCollides = (boxCollider: BoxCollider, direction: ObjectDirection): boolean => {
    // Look infront of GameObject based on direction for future collisions
    switch (direction) {
      case ObjectDirection.Up: {
        const leftTileX: number = Math.floor(
          (boxCollider.position.x - boxCollider.halfWidth) / this.tileSize
        );
        const bottomTileY: number = Math.floor(
          (boxCollider.position.y - (boxCollider.halfHeight + boxCollider.position.speed)) /
            this.tileSize
        );
        const rightTileX: number = Math.floor(
          (boxCollider.position.x + boxCollider.halfWidth) / this.tileSize
        );

        return (
          !!this.tiles[bottomTileY * this.width + leftTileX] ||
          !!this.tiles[bottomTileY * this.width + rightTileX]
        );
      }

      case ObjectDirection.Right: {
        const rightTileX: number = Math.floor(
          (boxCollider.position.x + boxCollider.halfWidth + boxCollider.position.speed) /
            this.tileSize
        );
        const bottomTileY: number = Math.floor(
          (boxCollider.position.y - boxCollider.halfHeight) / this.tileSize
        );
        const topTileY: number = Math.floor(
          (boxCollider.position.y + boxCollider.halfHeight) / this.tileSize
        );

        return (
          !!this.tiles[bottomTileY * this.width + rightTileX] ||
          !!this.tiles[topTileY * this.width + rightTileX]
        );
      }

      case ObjectDirection.Down: {
        const leftTileX: number = Math.floor(
          (boxCollider.position.x - boxCollider.halfWidth) / this.tileSize
        );
        const topTileY: number = Math.floor(
          (boxCollider.position.y + boxCollider.halfHeight + boxCollider.position.speed) /
            this.tileSize
        );
        const rightTileX: number = Math.floor(
          (boxCollider.position.x + boxCollider.halfWidth) / this.tileSize
        );

        return (
          !!this.tiles[topTileY * this.width + leftTileX] ||
          !!this.tiles[topTileY * this.width + rightTileX]
        );
      }

      case ObjectDirection.Left: {
        const leftTileX: number = Math.floor(
          (boxCollider.position.x - boxCollider.halfWidth - boxCollider.position.speed) /
            this.tileSize
        );
        const bottomTileY: number = Math.floor(
          (boxCollider.position.y - boxCollider.halfHeight) / this.tileSize
        );
        const topTileY: number = Math.floor(
          (boxCollider.position.y + boxCollider.halfHeight) / this.tileSize
        );

        return (
          !!this.tiles[bottomTileY * this.width + leftTileX] ||
          !!this.tiles[topTileY * this.width + leftTileX]
        );
      }
    }
  };

  // Look for possible directions around boxCollider
  public tilesWithIdAround = (boxCollider: BoxCollider, tileId: number): ObjectDirection[] => {
    const tileY: number = Math.floor(boxCollider.position.y / this.tileSize);
    const tileX: number = Math.floor(boxCollider.position.x / this.tileSize);

    const bottomY: number = Math.floor(
      (boxCollider.position.y + boxCollider.halfWidth + boxCollider.position.speed) / this.tileSize
    );

    const topY: number = Math.floor(
      (boxCollider.position.y - boxCollider.halfWidth - boxCollider.position.speed) / this.tileSize
    );

    const leftX: number = Math.floor(
      (boxCollider.position.x - boxCollider.halfWidth - boxCollider.position.speed) / this.tileSize
    );

    const rightX: number = Math.floor(
      (boxCollider.position.x + boxCollider.halfWidth + boxCollider.position.speed) / this.tileSize
    );

    const directions: ObjectDirection[] = [];

    if (this.tiles[topY * this.width + tileX] === tileId) {
      directions.push(ObjectDirection.Up);
    }

    if (this.tiles[tileY * this.width + rightX] === tileId) {
      directions.push(ObjectDirection.Right);
    }

    if (this.tiles[bottomY * this.width + tileX] === tileId) {
      directions.push(ObjectDirection.Down);
    }

    if (this.tiles[tileY * this.width + leftX] === tileId) {
      directions.push(ObjectDirection.Left);
    }

    return directions;
  };

  // Look for tile with certain id around x, y
  public nearestEventWithId = ({ x, y, id }): any => {
    const tileX = Math.floor(x / this.tileSize);
    const tileY = Math.floor(y / this.tileSize);

    if (this.tiles[tileY * this.width + tileX + 1] === id) {
      return {
        x: (tileX + 1) * this.tileSize + this.tileSize / 2,
        y: tileY * this.tileSize + this.tileSize / 2
      };
    }

    if (this.tiles[tileY * this.width + tileX - 1] === id) {
      return {
        x: (tileX - 1) * this.tileSize + this.tileSize / 2,
        y: tileY * this.tileSize + this.tileSize / 2
      };
    }

    if (this.tiles[(tileY + 1) * this.width + tileX] === id) {
      return {
        x: tileX * this.tileSize + this.tileSize / 2,
        y: (tileY + 1) * this.tileSize + this.tileSize / 2
      };
    }

    if (this.tiles[(tileY - 1) * this.width + tileX] === id) {
      return {
        x: tileX * this.tileSize + this.tileSize / 2,
        y: (tileY - 1) * this.tileSize + this.tileSize / 2
      };
    }

    throw Error(`No event with id: ${id} found around x: ${x} y: ${y}`);
  };

  public getRandomTileById = (id): Position => {
    const tile: number = random(0, this.tiles.length - 1);

    if (this.tiles[tile] === id) {
      const tileX = tile % this.width;
      const tileY = Math.floor((tile + 1) / this.width);
      return new Position({
        x: tileX * this.tileSize + random(0, 1600) / 100,
        y: tileY * this.tileSize + random(0, 1600) / 100
      });
    }

    return this.getRandomTileById(id);
  };
}

export default TileMap;
