import { Door, Wall } from "@/types/inter";
import { GridPoint, GridTile, TileFlags } from "@/types/tiles";
import { useEditorState } from "@/state/editorState";
import { resetAllFlags, resetAllFurniture } from "./flags";
import {
  getDoorTiles,
  getFurnitureInternalTiles,
  getFurnitureTiles,
  getWallSegmentTiles,
} from "./tiles";
import { Furniture } from "@/types/furniture";

interface TileProcessingOptions {}

export const processTiles = (
  tiles: GridTile[][],
  walls: Wall[],
  points: GridPoint[][],
  doors: Door[],
  furniture: Furniture[],
  tileProcessingOptions: TileProcessingOptions
) => {
  resetAllFlags();
  resetAllFurniture();

  walls.forEach((wall) => {
    wall.segments.forEach((segment) => {
      const tiles = getWallSegmentTiles(segment);
      const flag = segment.hasWindow ? TileFlags.Window : TileFlags.Wall;
      tiles.forEach((tile) => {
        useEditorState.getState().addTileFlag(tile, flag);
      });
    });
  });

  doors.forEach((door) => {
    const tiles = getDoorTiles(door);
    tiles.forEach((tile) => {
      useEditorState.getState().addTileFlag(tile, TileFlags.Door);
    });
  });

  furniture.forEach((f) => {
    const tiles = getFurnitureTiles(f);
    const internal = getFurnitureInternalTiles(f);
    tiles.forEach((tile) => {
      useEditorState.getState().addTileFlag(tile, TileFlags.FurnitureInfluence);
    });
    internal.forEach((tile) => {
      useEditorState.getState().addTileFurniture(tile, f);
    });
  });
};
