import { useEditorState } from "@/state/editorState";
import { GridTile, TileFlags } from "@/types/tiles";

const floodFill = (x: number, y: number, tiles: GridTile[][]) => {
  if (
    x < 0 ||
    x >= tiles.length ||
    y < 0 ||
    y >= tiles[0].length ||
    tiles[x][y].flags & TileFlags.RuleAffected
  ) {
    return;
  }

  tiles[x][y].flags |= TileFlags.RuleAffected;

  // Stop if we hit a wall
  if (tiles[x][y].flags & TileFlags.Wall) {
    return;
  }

  floodFill(x + 1, y, tiles);
  floodFill(x - 1, y, tiles);
  floodFill(x, y + 1, tiles);
  floodFill(x, y - 1, tiles);

  // Diagonals
  floodFill(x + 1, y + 1, tiles);
  floodFill(x + 1, y - 1, tiles);
  floodFill(x - 1, y + 1, tiles);
  floodFill(x - 1, y - 1, tiles);
};

export const doFloodFill = (startTile: GridTile) => {
  const tiles = useEditorState.getState().tiles;
  floodFill(startTile.pos.y, startTile.pos.x, tiles);
  useEditorState.getState().setTiles(tiles);
};
