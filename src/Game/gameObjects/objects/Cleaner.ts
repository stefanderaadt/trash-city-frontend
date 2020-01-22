/* eslint-disable import/no-cycle */
import * as PIXI from 'pixi.js';

import IGameObject from '../IGameObject';
import BoxCollider from '../../BoxCollider';
import Position from '../Position';
import game from '../../Game';
import random from '../../../utils/random';
import { GameEventIds, ObjectDirection } from '../../../enums';

class Cleaner implements IGameObject {
  public boxCollider: BoxCollider;

  private type: number = 8;
  private sprite: PIXI.AnimatedSprite;
  private animations: object = {};

  constructor({ x, y }) {
    // Set position with random speed
    const position = new Position({ x, y, speed: random(75, 125) / 100 });
    // Set object size for collision detection
    this.boxCollider = new BoxCollider({ width: 16, height: 16, position });
  }

  public init = (): PIXI.AnimatedSprite => {
    // Get animations and add to animations object
    this.initAnimation(`${this.type}_walk_left`);
    this.initAnimation(`${this.type}_walk_right`);
    this.initAnimation(`${this.type}_walk_up`);
    this.initAnimation(`${this.type}_walk_down`);

    // Create new AnimatedSprite based on animation
    const sprite = new PIXI.AnimatedSprite(this.animations[`${this.type}_walk_down`]); // Create new pixi AnimatedSprite from initialized animation
    sprite.x = this.boxCollider.position.x; // Initial x
    sprite.y = this.boxCollider.position.y; // Initial y
    sprite.pivot.x = 8; // Set center of rotation to the center of the sprite
    sprite.pivot.y = 8; // Set center of rotation to the center of the sprite
    sprite.animationSpeed = 0.1; // Set animation speed
    sprite.play(); // Start animation
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
    // Pickup trash randomly
    if (Math.random() > 0.992) {
      game.currentLevel.trashLayer.pickupTrash(this.boxCollider);
    }

    // Find possible directions for AI
    const directions = game.currentLevel.eventsMap.tilesWithIdAround(
      this.boxCollider,
      GameEventIds.SidewalkArea
    );

    // Check if some possible directions are found
    if (directions && directions.length) {
      // Keep moving in same direction 99 out of 100 times or find a new direction
      if (!directions.includes(this.boxCollider.position.direction) || Math.random() > 0.99) {
        // Update to new direction
        this.boxCollider.position.setDirection(directions[random(0, directions.length)]);

        // Animation based on new direction
        switch (this.boxCollider.position.direction) {
          case ObjectDirection.Up:
            this.sprite.textures = this.animations[`${this.type}_walk_up`];
            break;
          case ObjectDirection.Down:
            this.sprite.textures = this.animations[`${this.type}_walk_down`];
            break;
          case ObjectDirection.Left:
            this.sprite.textures = this.animations[`${this.type}_walk_left`];
            break;
          case ObjectDirection.Right:
            this.sprite.textures = this.animations[`${this.type}_walk_right`];
            break;
        }

        // Start animation
        if (!this.sprite.playing) this.sprite.play();
      }

      // Update position with new position
      this.boxCollider.position.x +=
        this.boxCollider.position.speed * this.boxCollider.position.xSpeed;
      this.boxCollider.position.y +=
        this.boxCollider.position.speed * this.boxCollider.position.ySpeed;

      // Try to pickup trash
    }
  };

  public render = (): void => {
    // Render sprite at right x,y coordinates
    this.sprite.x = this.boxCollider.position.x;
    this.sprite.y = this.boxCollider.position.y;
  };

  public destroy = (): void => {
    // Remove sprite from PixiJS
    this.sprite.destroy();
  };

  public pause = (): void => {
    // Stop animation on pause
    this.sprite.stop();
  };

  public resume = (): void => {
    // Start animation on resume
    this.sprite.play();
  };
}

export default Cleaner;
