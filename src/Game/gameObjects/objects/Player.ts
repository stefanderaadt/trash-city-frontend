/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import { GlowFilter } from '@pixi/filter-glow';

import IGameObject from '../IGameObject';
import Position from '../Position';
import BoxCollider from '../../BoxCollider';
import { ObjectDirection, Keys } from '../../../enums';

import game from '../../Game';

class Player implements IGameObject {
  public boxCollider: BoxCollider;
  public width: number = 16;
  public height: number = 16;

  private sprite: PIXI.AnimatedSprite;
  private animations = {};

  private direction: ObjectDirection;
  private previousDirection: ObjectDirection;

  private arrowKeyDown: boolean = false;
  private previousArrowKeyDown: boolean = false;

  constructor({ x, y }) {
    const position = new Position({ x, y, speed: 2 });
    this.boxCollider = new BoxCollider({ width: 10, height: 14, position });
  }

  public init = (): PIXI.AnimatedSprite => {
    // Get animations and add to animations object
    this.initAnimation('7_walk_left');
    this.initAnimation('7_walk_right');
    this.initAnimation('7_walk_up');
    this.initAnimation('7_walk_down');

    // Create new AnimatedSprite based on animation
    const sprite: PIXI.AnimatedSprite = new PIXI.AnimatedSprite(this.animations['7_walk_down']);
    sprite.x = this.boxCollider.position.x;
    sprite.y = this.boxCollider.position.y;
    sprite.pivot.x = 8; // Set center of rotation to the center of the sprite
    sprite.pivot.y = 8; // Set center of rotation to the center of the sprite
    sprite.animationSpeed = 0.1; // Set animation speed
    sprite.filters = [new GlowFilter(5, 2, 1, 0xffffff)];
    this.sprite = sprite;

    return this.sprite;
  };

  private initAnimation = (id: string): void => {
    // Get animation from assetLoader with id
    const animation = game.assetLoader.getAnimationById({
      tileset: 'img/sprites/kenney_rpg_characters/kenney_rpg_characters.json',
      id
    });

    // Add animation to 'animations' object
    this.animations[id] = animation;
  };

  public update = (): void => {
    this.arrowKeyDown = false;

    // Move up if the user is holding the arrow up key
    if (
      game.inputHandler.keyIsPressed(Keys.ArrowUp) &&
      !game.currentLevel.collisionMap.objectCollides(this.boxCollider, ObjectDirection.Up)
    ) {
      this.boxCollider.position.y -= 1 * this.boxCollider.position.speed;
      this.direction = ObjectDirection.Up;
      this.arrowKeyDown = true;
    }

    // Move right if the user is holding the arrow right key
    if (
      game.inputHandler.keyIsPressed(Keys.ArrowRight) &&
      !game.currentLevel.collisionMap.objectCollides(this.boxCollider, ObjectDirection.Right)
    ) {
      this.boxCollider.position.x += 1 * this.boxCollider.position.speed;
      this.direction = ObjectDirection.Right;
      this.arrowKeyDown = true;
    }

    // Move down if the user is holding the arrow down key
    if (
      game.inputHandler.keyIsPressed(Keys.ArrowDown) &&
      !game.currentLevel.collisionMap.objectCollides(this.boxCollider, ObjectDirection.Down)
    ) {
      this.boxCollider.position.y += 1 * this.boxCollider.position.speed;
      this.direction = ObjectDirection.Down;
      this.arrowKeyDown = true;
    }

    // Move left if the user is holding the arrow left key
    if (
      game.inputHandler.keyIsPressed(Keys.ArrowLeft) &&
      !game.currentLevel.collisionMap.objectCollides(this.boxCollider, ObjectDirection.Left)
    ) {
      this.boxCollider.position.x -= 1 * this.boxCollider.position.speed;
      this.direction = ObjectDirection.Left;
      this.arrowKeyDown = true;
    }

    // Try user actions once when the SpaceBar key is pressed
    if (game.inputHandler.keyIsPressed(Keys.SpaceBar) && !(game.gameLoop.frame % 10)) {
      game.currentLevel.trashLayer.pickupTrash(this.boxCollider);
      game.currentLevel.gameObjectLayer.repairFilter(this.boxCollider);
      game.currentLevel.gameObjectLayer.spawnCleaner(this.boxCollider);
    }

    // Update animation if the direction has changed
    if (this.direction !== this.previousDirection) {
      this.sprite.textures = this.animations[
        `7_walk_${ObjectDirection[this.direction].toLowerCase()}`
      ];
      this.sprite.play();
    }

    // Stop the animation if the user stopped moving
    if (!this.arrowKeyDown && (this.sprite.currentFrame === 1 || this.sprite.currentFrame === 3)) {
      this.sprite.stop();
    } else if (this.previousArrowKeyDown !== this.arrowKeyDown) {
      this.sprite.play();
    }

    // Update previous values for next loop
    this.previousDirection = this.direction;
    this.previousArrowKeyDown = this.arrowKeyDown;
  };

  public render = (): void => {
    // Update sprite position
    this.sprite.x = this.boxCollider.position.x;
    this.sprite.y = this.boxCollider.position.y;
  };

  public destroy = (): void => {
    // Destroy sprite
    this.sprite.destroy();
  };

  public pause = (): void => {
    // Pause animation
    this.sprite.stop();
  };

  public resume = (): void => {
    // Resume animation when still moving
    if (this.arrowKeyDown) {
      this.sprite.play();
    }
  };
}

export default Player;
