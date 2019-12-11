import * as PIXI from 'pixi.js';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

import store from '../store';

import { startLoading, onLoading, loadingCompleted } from '../actions/loaderActions';

import spritesheetTilesetMap from './assets/spritesheet_tileset_map.json';
import soundMap from './assets/sound_map.json';

class AssetLoader {
  private loader: PIXI.Loader;
  private tilesets: object = {};

  public init = async (): Promise<void> => {
    // Get new PIXI Loader
    this.loader = new PIXI.Loader();

    // Set events
    this.loader.onStart.add(this.onStart);
    this.loader.onLoad.add(this.onLoad);
    this.loader.onComplete.add(this.onComplete);

    // Map 'TexturePacker' ids to 'Tiled' tile ids and add 'TexturePacker' tilesets to loader.
    // These tile maps are based on '/src/Game/assets/spritesheet_tileset_map.json'.
    // To tell Pixi what sprites to load and to retrieve the right sprites from created maps in 'Tiled'.
    await spritesheetTilesetMap.forEach(async map => {
      // Add 'TexturePacker' tileset to loader
      this.loader.add(map.spritesheet);
      const tileset = await axios.get(map.tileset);

      // Parse 'Tiled' tileset XML data
      const xml = await parseStringPromise(tileset.data);

      // Map 'TexturePacker' ids to 'Tiled' tile ids
      this.tilesets[map.spritesheet] = xml.tileset.tile.map(t => ({
        mapId: parseInt(t.$.id, 10),
        id: t.image[0].$.source
      }));
    });

    soundMap.forEach(map => {
      this.loader.add(map.key, map.path);
    });

    // Start loading process
    this.loader.load();
  };

  private onStart = (): void => {
    // Dispatch loading process to front-end
    store.dispatch(startLoading());
  };

  private onLoad = (e): void => {
    // Dispatch update front-end with new progress (for loading bar)
    store.dispatch(onLoading(e.progress));
  };

  private onComplete = (): void => {
    // Dispatch loadingCompleted event to front-end
    store.dispatch(loadingCompleted());
  };

  // Get assets by 'Tiled' tile ids for tilemap
  public getAssetByMapId = ({ tileset, mapId }): PIXI.Texture => {
    const tileSetMap = this.tilesets[tileset];
    const tile = tileSetMap.find(t => t.mapId === mapId);

    if (!tile) throw new Error(`Tile with mapId: ${mapId} not found!`);

    return this.getAssetById({ tileset, id: tile.id });
  };

  // Get loaded sound by ID to play in gameobject
  public getSoundById = ({ id }): PIXI.sound.Sound =>
    this.loader?.resources[id].sound

  // Get assets by 'Texture Packer' id
  public getAssetById = ({ tileset, id }): PIXI.Texture =>
    this.loader?.resources[tileset]?.spritesheet?.textures[id];

  // Get animations by 'Texture Packer' id
  public getAnimationById = ({ tileset, id }): object =>
    this.loader?.resources[tileset]?.spritesheet?.animations[id];
}

export default AssetLoader;
