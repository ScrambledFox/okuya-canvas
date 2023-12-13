import { useEditorState } from "@/state/editorState";
import { Door, Wall, WallSegment } from "@/types/inter";
import { GridTile, GridTile as Tile } from "@/types/tiles";
import { Line } from "../line/lines";
import { Furniture } from "@/types/furniture";
import { getFurnitureRecipe, isInShape } from "../furniture/recipes";
import { Vector2d } from "../points/points";

export const transposedGridTiles = (tiles: GridTile[][]) => {
  const width = tiles[0].length;
  const height = tiles.length;
  const transposedGrid = Array.from({ length: width }, (_, x) =>
    Array.from({ length: height }, (_, y) => tiles[y][x])
  );
  return transposedGrid;
};

export const getTileAtCoord = (x: number, y: number): Tile | null => {
  const gridSize = useEditorState.getState().gridSize;
  if (x < 0 || x > gridSize.x - 1 || y < 0 || y > gridSize.y - 1) return null;
  return useEditorState.getState().tiles[y][x];
};

// WallSegment has a start and end point and always a length of 1, but we want to get the tiles next to this line.
// For example, a segment from (2, 2) to (2, 3) should return the tiles (1, 2) and (2, 2).
export const getWallSegmentTiles = (segment: WallSegment): Set<Tile> => {
  const tiles: Set<Tile> = new Set();

  // Create a line that starts at the most top-left point of the segment and ends at the most bottom-right point of the segment.
  const line = new Line(
    Math.min(segment.start.x, segment.end.x),
    Math.min(segment.start.y, segment.end.y),
    Math.max(segment.start.x, segment.end.x),
    Math.max(segment.start.y, segment.end.y)
  );

  const tile = getTileAtCoord(line.x1, line.y1);
  if (tile !== null) tiles.add(tile);

  if (line.isHorizontal) {
    const tile = getTileAtCoord(line.x1, line.y1 - 1);
    if (tile !== null) tiles.add(tile);
  } else {
    const tile = getTileAtCoord(line.x1 - 1, line.y1);
    if (tile !== null) tiles.add(tile);
  }

  return tiles;
};

export const getContainsFurnitureType = (
  tile: Tile,
  furnitureType: string
): boolean => {
  return tile.containingFurniture.some(
    (furniture) => furniture.furnitureType === furnitureType
  );
};

export const getDoorTiles = (door: Door): Set<Tile> => {
  const tiles: Set<Tile> = new Set();

  const tryAddTile = (x: number, y: number) => {
    const tile = getTileAtCoord(x, y);
    if (tile !== null) tiles.add(tile);
  };

  const line = new Line(door.start.x, door.start.y, door.end.x, door.end.y);
  const rotation = Math.round((line.angle * (180 / Math.PI)) / 90);

  switch (rotation) {
    case 0:
      tryAddTile(line.x1, line.y1);
      tryAddTile(line.x1 + 1, line.y1);
      tryAddTile(line.x1, line.y1 - 1);
      tryAddTile(line.x1 + 1, line.y1 - 1);
      tryAddTile(line.x1, line.y1 - 2);
      tryAddTile(line.x1 + 1, line.y1 - 2);
      break;
    case 1:
      tryAddTile(line.x1 - 1, line.y1);
      tryAddTile(line.x1 - 1, line.y1 + 1);
      tryAddTile(line.x1, line.y1);
      tryAddTile(line.x1, line.y1 + 1);
      tryAddTile(line.x1 + 1, line.y1);
      tryAddTile(line.x1 + 1, line.y1 + 1);
      break;
    case 2:
      tryAddTile(line.x1 - 2, line.y1 - 1);
      tryAddTile(line.x1 - 1, line.y1 - 1);
      tryAddTile(line.x1 - 2, line.y1);
      tryAddTile(line.x1 - 1, line.y1);
      tryAddTile(line.x1 - 2, line.y1 + 1);
      tryAddTile(line.x1 - 1, line.y1 + 1);
      break;
    case -1:
      tryAddTile(line.x1, line.y1 - 1);
      tryAddTile(line.x1, line.y1 - 2);
      tryAddTile(line.x1 - 1, line.y1 - 1);
      tryAddTile(line.x1 - 1, line.y1 - 2);
      tryAddTile(line.x1 - 2, line.y1 - 1);
      tryAddTile(line.x1 - 2, line.y1 - 2);
      break;
  }

  return tiles;
};

export const getTilesBetweenInterPointRect = (
  interPointOne: Vector2d,
  interPointTwo: Vector2d
): Set<Tile> => {
  const minX = Math.min(interPointOne.x, interPointTwo.x);
  const maxX = Math.max(interPointOne.x, interPointTwo.x);
  const minY = Math.min(interPointOne.y, interPointTwo.y);
  const maxY = Math.max(interPointOne.y, interPointTwo.y);

  return getTilesInRect(new Vector2d(minX, minY), new Vector2d(maxX, maxY));
};

export const getNeighbours = (
  tile: Tile,
  includeDiagonals = true
): Set<Tile> => {
  const neighbours: Set<Tile> = new Set();

  const addTile = (x: number, y: number) => {
    const tile = getTileAtCoord(x, y);
    if (tile !== undefined) return;
    neighbours.add(tile);
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

// Get all tiles from two opposing corners or a rectangle.
// Can be any two corners, as long as they are opposing.
export const getTilesInRect = (
  cornerOne: Vector2d,
  cornerTwo: Vector2d
): Set<Tile> => {
  const tiles: Set<Tile> = new Set();

  const minX = Math.min(cornerOne.x, cornerTwo.x);
  const maxX = Math.max(cornerOne.x, cornerTwo.x);
  const minY = Math.min(cornerOne.y, cornerTwo.y);
  const maxY = Math.max(cornerOne.y, cornerTwo.y);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const tile = getTileAtCoord(x, y);
      if (tile !== null) tiles.add(tile);
    }
  }

  return tiles;
};

// Get all tiles under a furniture piece with the given position, rotation and size.
export const getFurnitureTiles = (furniture: Furniture): Set<Tile> => {
  const x = furniture.position.x;
  const y = furniture.position.y;

  const rotation = furniture.rotation * 90 * (Math.PI / 180);

  const recipe = getFurnitureRecipe(furniture.furnitureType);

  const topLeft = new Vector2d(x, y);
  const bottomRight = new Vector2d(x + recipe.width - 1, y + recipe.height - 1);

  // Rotate the rectangle around the center of the furniture.
  const center = new Vector2d(
    x + recipe.width / 2 - 0.5,
    y + recipe.height / 2 - 0.5
  );

  const rotatedOne = topLeft.rotateAround(center, rotation).rounded;
  const rotatedTwo = bottomRight.rotateAround(center, rotation).rounded;

  const tiles = getTilesInRect(rotatedOne, rotatedTwo);
  return tiles;
};

// Gets all tiles of a furniture except the outer tiles.
export const getFurnitureInternalTiles = (furniture: Furniture): Set<Tile> => {
  const x = furniture.position.x;
  const y = furniture.position.y;

  const rotation = furniture.rotation * 90 * (Math.PI / 180);

  const recipe = getFurnitureRecipe(furniture.furnitureType);

  const topLeft = new Vector2d(x, y);
  const bottomRight = new Vector2d(x + recipe.width - 1, y + recipe.height - 1);

  // Rotate the rectangle around the center of the furniture.
  const center = new Vector2d(
    x + recipe.width / 2 - 0.5,
    y + recipe.height / 2 - 0.5
  );

  const rotatedOne = topLeft.rotateAround(center, rotation).ceiled;
  const rotatedTwo = bottomRight.rotateAround(center, rotation).ceiled;

  const tiles: Set<Tile> = new Set();

  const minX = Math.min(rotatedOne.x, rotatedTwo.x);
  const maxX = Math.max(rotatedOne.x, rotatedTwo.x);
  const minY = Math.min(rotatedOne.y, rotatedTwo.y);
  const maxY = Math.max(rotatedOne.y, rotatedTwo.y);

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      const tile = getTileAtCoord(x, y);

      console.log(x, y);

      const localX = x - minX;
      const localY = y - minY;

      if (tile !== null && isInShape(new Vector2d(localX, localY), furniture))
        tiles.add(tile);
    }
  }

  return tiles;
};
