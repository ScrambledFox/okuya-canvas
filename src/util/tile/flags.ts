import { useEditorState } from "@/state/editorState";
import { GridTile } from "@/types/tiles";

export const resetFlagsOfTiles = (tiles: GridTile[][]) => {
  tiles.forEach((row) => {
    row.forEach((tile) => {
      tile.flags = 0;
    });
  });

  return tiles;
};

export const resetAllFlags = () => {
  const tiles = useEditorState.getState().tiles;
  resetFlagsOfTiles(tiles);
  useEditorState.getState().setTiles(tiles);
};
