import { Wall } from "@/types/inter";
import { GridPoint, GridTile, TileFlags } from "@/types/tiles";
import { getTilesNextToWall } from "./tiles";
import { useEditorState } from "@/state/editorState";
import { resetAllFlags, resetAllFlags as resetFlagsOfTiles } from "./flags";

interface TileProcessingOptions {}

export const processTiles = (
  tiles: GridTile[][],
  walls: Wall[],
  points: GridPoint[][],
  tileProcessingOptions: TileProcessingOptions
) => {
  resetAllFlags();

  Array.from(Array(walls.length).keys()).forEach((x) => {
    const wall = walls[x];
    const wallTiles = getTilesNextToWall(wall);

    wallTiles.forEach((tile) => {
      useEditorState.getState().addTileFlag(tile, TileFlags.Wall);
    });
  });
};
