/* eslint-disable import/no-cycle */
import Player from './objects/Player';
import Civilian from './objects/Civilian';
import CivilianSpawnPoint from './objects/CivilianSpawnPoint';
import Trash from './objects/Trash';
import WaterTile from './objects/WaterTile';
import FilterSystem from './objects/FilterSystem';

// Export all object constructors for GameObjectFactory
export default {
  Player,
  Civilian,
  CivilianSpawnPoint,
  Trash,
  WaterTile,
  FilterSystem
};
