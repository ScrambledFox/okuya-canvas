import { useEditorState } from "@/state/editor/editorState";
import { Wall } from "@/types/inter";
import { GridTile, GridTile as Tile, TileCoord } from "@/types/tiles";

export const transposedGridTiles = (tiles: GridTile[][]) => {
  const width = tiles[0].length;
  const height = tiles.length;
  const transposedGrid = Array.from({ length: width }, (_, x) =>
    Array.from({ length: height }, (_, y) => tiles[y][x])
  );
  return transposedGrid;
};

export const getTileAtCoord = (x: number, y: number) => {
  const gridSize = useEditorState.getState().gridSize;
  if (x < 0 || x > gridSize.x - 1 || y < 0 || y > gridSize.y - 1)
    return undefined;
  return useEditorState.getState().tiles[x][y];
};

export const getTilesNextToWall = (wall: Wall) => {
  const tiles: Tile[] = [];

  const deltaX = wall.end.x - wall.start.x;
  const deltaY = wall.end.y - wall.start.y;

  const xDirection = deltaX > 0 ? 1 : -1;
  const yDirection = deltaY > 0 ? 1 : -1;

  const xStart = wall.start.x;
  const yStart = wall.start.y;

  const xEnd = wall.end.x;
  const yEnd = wall.end.y;

  const addTile = (x: number, y: number) => {
    const tile = getTileAtCoord(x, y);
    if (tile === undefined) return;
    tiles.push(tile);
  };

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // x is the main axis
    for (
      let x = xDirection === 1 ? xStart : xStart - 1;
      xDirection === 1 ? x < xEnd : x >= xEnd;
      x += xDirection
    ) {
      addTile(x, yStart);
      if (yStart - 1 >= 0) {
        addTile(x, yStart - 1);
      }
    }
  } else {
    // y is the main axis
    for (
      let y = yDirection === 1 ? yStart : yStart - 1;
      yDirection === 1 ? y < yEnd : y >= yEnd;
      y += yDirection
    ) {
      addTile(xStart, y);
      if (xStart - 1 >= 0) {
        addTile(xStart - 1, y);
      }
    }
  }

  return tiles;
};

export const getNeighbours = (tile: Tile, includeDiagonals = true): Tile[] => {
  const neighbours: Tile[] = [];

  const addTile = (x: number, y: number) => {
    const tile = getTileAtCoord(x, y);
    if (tile === undefined) return;
    neighbours.push(tile);
  };

  if (tile.pos.x > 0) {
    addTile(tile.pos.x - 1, tile.pos.y);
  }

  if (tile.pos.x < 30) {
    addTile(tile.pos.x + 1, tile.pos.y);
  }

  if (tile.pos.y > 0) {
    addTile(tile.pos.x, tile.pos.y - 1);
  }

  if (tile.pos.y < 30) {
    addTile(tile.pos.x, tile.pos.y + 1);
  }

  if (!includeDiagonals) return neighbours;

  if (tile.pos.x > 0 && tile.pos.y > 0) {
    addTile(tile.pos.x - 1, tile.pos.y - 1);
  }

  if (tile.pos.x > 0 && tile.pos.y < 30) {
    addTile(tile.pos.x - 1, tile.pos.y + 1);
  }

  if (tile.pos.x < 30 && tile.pos.y > 0) {
    addTile(tile.pos.x + 1, tile.pos.y - 1);
  }

  if (tile.pos.x < 30 && tile.pos.y < 30) {
    addTile(tile.pos.x + 1, tile.pos.y + 1);
  }

  return neighbours;
};
