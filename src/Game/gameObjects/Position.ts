import { ObjectDirection } from '../../enums';

class Position {
  public x: number;
  public y: number;
  public xSpeed: number = 0;
  public ySpeed: number = 0;
  public speed: number;
  public direction: ObjectDirection;

  constructor({ x, y, speed = 1 }) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  public setDirection = (direction: ObjectDirection): void => {
    // Set new direction
    this.direction = direction;

    // Set x and y speed based on new direction
    if (direction === ObjectDirection.Up) {
      this.xSpeed = 0;
      this.ySpeed = -1;
    }

    if (direction === ObjectDirection.Right) {
      this.xSpeed = 1;
      this.ySpeed = 0;
    }

    if (direction === ObjectDirection.Down) {
      this.xSpeed = 0;
      this.ySpeed = 1;
    }

    if (direction === ObjectDirection.Left) {
      this.xSpeed = -1;
      this.ySpeed = 0;
    }
  };
}

export default Position;
