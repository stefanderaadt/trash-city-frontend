class GameLoop {
  private isPlaying: boolean = false;
  private tref;
  private callback: Function;
  public frame: number = -1;
  public fps: number;

  constructor(fps: number, callback: Function) {
    this.fps = fps;
    this.callback = callback;
  }

  // Start gameloop with requestAnimationFrame
  public start = (): void => {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.tref = requestAnimationFrame(this.loop);
    }
  };

  // Pause gameloop
  public pause = (): void => {
    if (this.isPlaying) {
      cancelAnimationFrame(this.tref);
      this.isPlaying = false;
    }
  };

  // Reset gameloop
  public reset = (): void => {
    this.pause();
    this.frame = -1;
  };

  // Actual gameloop with callback
  private loop = (): void => {
    this.frame++;
    this.tref = requestAnimationFrame(this.loop);
    this.callback(this.frame);
  };
}

export default GameLoop;
