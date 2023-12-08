import { Wall } from "@/types/inter";
import { GridPoint, GridTile, TileFlags } from "@/types/tiles";
import { useEditorState } from "@/state/editorState";
import { resetAllFlags, resetAllFlags as resetFlagsOfTiles } from "./flags";
import { getWallSegmentTiles } from "./tiles";

interface TileProcessingOptions {}

export const processTiles = (
  tiles: GridTile[][],
  walls: Wall[],
  points: GridPoint[][],
  tileProcessingOptions: TileProcessingOptions
) => {
  resetAllFlags();

  walls.forEach((wall) => {
    wall.segments.forEach((segment) => {
      const tiles = getWallSegmentTiles(segment);
      const flag = segment.hasWindow ? TileFlags.Window : TileFlags.Wall;
      tiles.forEach((tile) => {
        useEditorState.getState().addTileFlag(tile, flag);
      });
    });
  });
};
