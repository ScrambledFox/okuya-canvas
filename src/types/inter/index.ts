import { PointCoord } from "../tiles";

export type InterType = "wall" | "wallSegment" | "door" | "window";

export type GridInter = {
  start: PointCoord;
  end: PointCoord;
  id: string;
  type: InterType;
};

// Wall type to store wall data that inherits from GridInter
export type Wall = GridInter & {};

export type WallSegment = GridInter & {
  wallId: string;
};
