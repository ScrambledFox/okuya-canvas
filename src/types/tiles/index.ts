// Type definitions for tile flags
export type TileFlags = "wall" | "door" | "window";

// Create tile type to store tile data
export type GridTile = {
  pos: TileCoord;
  id: string;
  color: string;
  flags: TileFlags[];
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
