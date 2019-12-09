import * as PIXI from 'pixi.js';

interface ILayer {
  container: PIXI.Container;
  update(): void;
  render(): void;
  pause(): void;
  resume(): void;
}

export default ILayer;
