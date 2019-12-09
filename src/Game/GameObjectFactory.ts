/* eslint-disable import/no-cycle */
import gameObjects from './gameObjects';

import IGameObject from './gameObjects/IGameObject';

class GameObjectFactory {
  // Create new GameObject instance based on name
  public create = ({ name, ...props }): IGameObject => {
    // Check if GameObject with name exists
    if (!(name in gameObjects)) throw new Error(`gameObject with name: ${name} not found.`);

    // Create instance of GameObject and pass properties
    return new gameObjects[name](props);
  };
}

export default GameObjectFactory;
