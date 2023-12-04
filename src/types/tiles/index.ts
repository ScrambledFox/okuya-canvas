// Type definitions for tile flags
export type TileFlags = "wall" | "door" | "window";

// Create tile type to store tile data
export type Tile = {
  x: number;
  y: number;
  id: string;
  color: string;
  flags: TileFlags[];
};
