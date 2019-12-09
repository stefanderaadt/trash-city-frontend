import BoxCollider from '../BoxCollider';

interface GameObject {
  boxCollider: BoxCollider;

  init(): PIXI.Sprite | PIXI.AnimatedSprite | void;
  update(): void;
  render(): void;
  pause(): void;
  resume(): void;
  destroy(): void;
}

export default GameObject;
