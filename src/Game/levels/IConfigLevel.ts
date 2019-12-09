import IConfigGameObject from '../gameObjects/IConfigGameObject';

interface IConfigLevel {
  id: number;
  layers: number;
  tileset: string;
  width: number;
  height: number;
  tileSize;
  tileMapLayers: number[][];
  collisionMap: number[];
  objectsMap: number[];
  gameObjects: IConfigGameObject[];
  initialTrashAmount: number;
  maxCivilians: number;
  civilianSpawnDelay: number;
  civilianSpawnChance: number;
  trashSpawnChance: number;
  trashMaxSpawnChance: number;
  trashIncreaseSpawnChance: number;
  trashSpawnIncreaseDelay: number;
  maxTrash: number;
  minTrashToWin: number;
  name: string;
  goal: string;
}

export default IConfigLevel;
