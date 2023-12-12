import { Wall } from "@/types/inter";
import { GridPoint, GridTile, TileFlags } from "@/types/tiles";
import { useEditorState } from "@/state/editorState";
import { resetAllFlags, resetAllFlags as resetFlagsOfTiles } from "./flags";
import { getFurnitureTiles, getWallSegmentTiles } from "./tiles";
import { Furniture } from "@/types/furniture";
import { processFurnitureScores } from "@/state/furnitureState";

interface TileProcessingOptions {}

export const processTiles = (
  tiles: GridTile[][],
  walls: Wall[],
  points: GridPoint[][],
  furniture: Furniture[],
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

  furniture.forEach((f) => {
    const tiles = getFurnitureTiles(f);
    tiles.forEach((tile) => {
      useEditorState.getState().addTileFlag(tile, TileFlags.FurnitureInfluence);
    });
  });
};
