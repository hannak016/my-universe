export function drawMap() {
  const DISPLAY = document
    .querySelector("canvas")
    .getContext("2d", { alpha: false, desynchronized: false });
  const BUFFER = document
    .createElement("canvas")
    .getContext("2d", { alpha: false, desynchronized: true });

  const TILE_SIZE = 32;

  const TILES = {
    0: { color: "#d8f4f4" }, // sky
    1: { color: "#ffffff" }, // cloud
    2: { color: "#3e611e" }, // grass
    3: { color: "#412823" }, // dirt
  };

  const MAP = {
    columns: 20,
    rows: 15,
    height: 15 * TILE_SIZE,
    width: 20 * TILE_SIZE,

    width_height_ratio: 20 / 15,

    tiles: [
      1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,
      0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,
      0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,
      0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
      3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    ],
  };

  function renderTiles() {
    var map_index = 0;
    for (var top = 0; top < MAP.height; top += TILE_SIZE) {
      for (var left = 0; left < MAP.width; left += TILE_SIZE) {
        var tile_value = MAP.tiles[map_index];
        var tile = TILES[tile_value];
        BUFFER.fillStyle = tile.color;
        BUFFER.fillRect(left, top, TILE_SIZE, TILE_SIZE);
        map_index++;
      }
    }
  }

  function renderDisplay() {
    DISPLAY.drawImage(BUFFER.canvas, 0, 0);
  }

  BUFFER.canvas.width = DISPLAY.canvas.width = MAP.width;
  BUFFER.canvas.height = DISPLAY.canvas.height = MAP.height;
  BUFFER.imageSmoothingEnabled = DISPLAY.imageSmoothingEnabled = false;

  renderTiles();
  renderDisplay();
}

export const platform1 = {
  x1: 128, // left side
  x2: 448, // right side
  y: 192, // height
};
