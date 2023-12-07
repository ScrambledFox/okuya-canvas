import { Vector2d } from "@/util/points/points";

// Type definitions for tile flags
export enum TileFlags {
  None = 0,
  Wall = 1 << 0,
  Door = 1 << 1,
  Window = 1 << 2,
  Flooded = 1 << 3,
}

// Tile Flag LUT
export const TileFlagLUT = {
  [TileFlags.None]: "None",
  [TileFlags.Wall]: "Wall",
  [TileFlags.Door]: "Door",
  [TileFlags.Window]: "Window",
  [TileFlags.Flooded]: "Flooded",
};

// Create tile type to store tile data
export type GridTile = {
  pos: Vector2d;
  id: string;
  color: string;
  flags: TileFlags;
};

export type GridPoint = {
  pos: Vector2d;
  id: string;
};
