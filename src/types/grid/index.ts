import { PointCoord } from "../tiles";

export type ScreenCoord = {
  x: number;
  y: number;
};

export type DragPoint = {
  pointCoord: PointCoord;
  screenCoord: ScreenCoord;
};
