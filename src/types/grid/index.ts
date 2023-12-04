import { PointCoord } from "../tiles";

export type screenCoord = {
  x: number;
  y: number;
};

export type DragPoint = {
  pointCoord: PointCoord;
  screenCoord: screenCoord;
};
