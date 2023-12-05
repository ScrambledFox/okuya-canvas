import { Wall } from "@/types/inter";
import { GridPoint, GridTile, TileFlags } from "@/types/tiles";
import { getTilesNextToWall } from "./tiles";
import { useEditorState } from "@/state/editor/editorState";

interface TileProcessingOptions {}

export const processTiles = (
  tiles: GridTile[][],
  walls: Wall[],
  points: GridPoint[][],
  tileProcessingOptions: TileProcessingOptions
) => {
  Array.from(Array(walls.length).keys()).forEach((x) => {
    const wall = walls[x];
    const wallTiles = getTilesNextToWall(wall);

    wallTiles.forEach((tile) => {
      console.log(tile);
      useEditorState.getState().addTileFlag(tile, TileFlags.Wall);
    });
  });
};
