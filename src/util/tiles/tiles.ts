import { useEditorState } from "@/state/editorState";
import { Wall, WallSegment } from "@/types/inter";
import { GridTile, GridTile as Tile } from "@/types/tiles";
import { Line } from "../line/lines";

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
  return useEditorState.getState().tiles[x][y];
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

// export const getTilesNextToWall = (wall: Wall) => {
//   const tiles: Tile[] = [];

//   const deltaX = wall.end.x - wall.start.x;
//   const deltaY = wall.end.y - wall.start.y;

//   const xDirection = deltaX > 0 ? 1 : -1;
//   const yDirection = deltaY > 0 ? 1 : -1;

//   const xStart = wall.start.x;
//   const yStart = wall.start.y;

//   const xEnd = wall.end.x;
//   const yEnd = wall.end.y;

//   const addTile = (x: number, y: number) => {
//     const tile = getTileAtCoord(x, y);
//     if (tile === undefined) return;
//     tiles.push(tile);
//   };

//   if (Math.abs(deltaX) > Math.abs(deltaY)) {
//     // x is the main axis
//     for (
//       let x = xDirection === 1 ? xStart : xStart - 1;
//       xDirection === 1 ? x < xEnd : x >= xEnd;
//       x += xDirection
//     ) {
//       addTile(x, yStart);
//       if (yStart - 1 >= 0) {
//         addTile(x, yStart - 1);
//       }
//     }
//   } else {
//     // y is the main axis
//     for (
//       let y = yDirection === 1 ? yStart : yStart - 1;
//       yDirection === 1 ? y < yEnd : y >= yEnd;
//       y += yDirection
//     ) {
//       addTile(xStart, y);
//       if (xStart - 1 >= 0) {
//         addTile(xStart - 1, y);
//       }
//     }
//   }

//   return tiles;
// };

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
