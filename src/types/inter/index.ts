import { PointCoord } from "../tiles";

export type InterType = "wall" | "door" | "window";

export type GridInter = {
  start: PointCoord;
  end: PointCoord;
  id: string;
  type: InterType;
};

// Wall type to store wall data that inherits from GridInter
export type Wall = GridInter & {
  type: "wall";
};
