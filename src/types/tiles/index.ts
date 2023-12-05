// Type definitions for tile flags
export enum TileFlags {
  None = 0,
  Wall = 1 << 0,
  Door = 1 << 1,
  Window = 1 << 2,
  Flooded = 1 << 3,
}
// Create tile type to store tile data
export type GridTile = {
  pos: TileCoord;
  id: string;
  color: string;
  flags: TileFlags;
};

export type TileCoord = {
  x: number;
  y: number;
};

export type GridPoint = {
  pos: PointCoord;
  id: string;
};

export type PointCoord = {
  x: number;
  y: number;
};
