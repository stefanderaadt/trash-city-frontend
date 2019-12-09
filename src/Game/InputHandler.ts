class InputHandler {
  public keysDown = {};

  constructor() {
    // Handle key events
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  // Add pressed keys to keysDown object
  private onKeyDown = (e): void => {
    this.keysDown[e.keyCode] = true;
  };

  // Remove released keys from keysDown object
  private onKeyUp = (e): void => {
    delete this.keysDown[e.keyCode];
  };

  // Check if key exists in keysDown object
  public keyIsPressed = (key: number): boolean => key in this.keysDown;
}

export default InputHandler;
