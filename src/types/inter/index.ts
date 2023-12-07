import { Vector2d } from "@/util/points/points";

export type InterType = "wall" | "wallSegment" | "door" | "window";

export type GridInter = {
  start: Vector2d;
  end: Vector2d;
  id: string;
  type: InterType;
};

// Wall type to store wall data that inherits from GridInter
export type Wall = GridInter & {
  childPoints: Set<Vector2d>;
};

export type WallSegment = GridInter & {
  wallId: string;
  hasDoor: boolean;
  hasWindow: boolean;
};

export type Door = GridInter & {
  walls: string[];
};
