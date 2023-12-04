import { PointCoord } from "../tiles";

export type InterType = "wall" | "door" | "window";

export type GridInter = {
  from: PointCoord;
  to: PointCoord;
  id: string;
  type: InterType;
};
