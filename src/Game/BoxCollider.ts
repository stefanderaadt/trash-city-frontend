import Position from './gameObjects/Position';

class BoxCollider {
  public position: Position;
  public width: number;
  public height: number;
  public halfWidth: number;
  public halfHeight: number;

  constructor({ width, height, position }) {
    this.width = width;
    this.height = height;
    this.position = position;

    this.halfWidth = width / 2;
    this.halfHeight = height / 2;
  }

  // Check if other BoxCollider is in radius of this BoxCollider with variable radius
  public isInRadius = (otherBoxCollider: BoxCollider, radius: number): boolean => {
    return (
      (otherBoxCollider.position.x - this.position.x) *
        (otherBoxCollider.position.x - this.position.x) +
        (otherBoxCollider.position.y - this.position.y) *
          (otherBoxCollider.position.y - this.position.y) <=
      radius * radius
    );
  };
}

export default BoxCollider;
