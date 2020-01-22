enum Screens {
  Loading,
  MainMenu,
  LevelMenu,
  SettingsMenu,
  ControlsMenu,
  Game
}

enum Popups {
  None,
  Pause,
  Score,
  Info
}

enum GameEventIds {
  SidewalkArea = 1,
  CivilianSpawnPoint = 2,
  WaterTile = 3,
  FilterSystem = 4,
  CleanerSpawnPoint = 5
}

enum TileLayers {
  Background,
  TopAssets1,
  TopAssets2
}

enum ObjectDirection {
  Up,
  Down,
  Left,
  Right
}

enum Keys {
  ArrowUp = 38,
  ArrowDown = 40,
  ArrowLeft = 37,
  ArrowRight = 39,
  SpaceBar = 32
}

enum Flags {
  FlippedHorizontally = 0x80000000,
  FlippedVertically = 0x40000000,
  FlippedDiagonally = 0x20000000
}

export { Screens, Popups, GameEventIds, ObjectDirection, Keys, TileLayers, Flags };
