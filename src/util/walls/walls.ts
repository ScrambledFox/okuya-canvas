import { useWallToolState } from "@/state/tools/wallToolState";
import { DragPoint } from "@/types/grid";
import { Wall, WallSegment } from "@/types/inter";

import { v4 as uuidv4 } from "uuid";
import { Vector2d } from "../points/points";

// Start Wall Placement
export const startWallPlacement = (coord: DragPoint) => {
  useWallToolState.getState().setLineStart(coord);
};

// End Wall Placement
export const endWallPlacement = (coord: DragPoint) => {
  if (useWallToolState.getState().lineStart === null) return;

  useWallToolState
    .getState()
    .createWall(useWallToolState.getState().lineStart!, coord);
};

// This method splits a wall line into segments of length 1. It is given that a wall line can only be horizontal or vertical.
export const generateWallSegments = (
  id: string,
  start: Vector2d,
  end: Vector2d
): WallSegment[] => {
  const segments: WallSegment[] = [];

  const addSegment = (start: Vector2d, end: Vector2d) => {
    const segment: WallSegment = {
      start: start,
      end: end,
      id: uuidv4(),
      type: "wallSegment",
      wallId: id,
      hasDoor: false,
      hasWindow: false,
    };
    segments.push(segment);
  };

  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  const xDirection = deltaX > 0 ? 1 : -1;
  const yDirection = deltaY > 0 ? 1 : -1;

  const xStart = start.x;
  const yStart = start.y;

  const xEnd = end.x;
  const yEnd = end.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // x is the main axis
    for (
      let x = xDirection === 1 ? xStart : xStart - 1;
      xDirection === 1 ? x < xEnd : x >= xEnd;
      x += xDirection
    ) {
      addSegment(new Vector2d(x, yStart), new Vector2d(x + 1, yStart));
    }
  } else {
    // y is the main axis
    for (
      let y = yDirection === 1 ? yStart : yStart - 1;
      yDirection === 1 ? y < yEnd : y >= yEnd;
      y += yDirection
    ) {
      addSegment(new Vector2d(xStart, y), new Vector2d(xStart, y + 1));
    }
  }

  return segments;
};

export const getAllWallPoints = (walls: Wall[]): Vector2d[] => {
  const points: Vector2d[] = [];

  walls.forEach((wall) => {
    const wallPoints = getWallPoints(wall);
    wallPoints.forEach((point) => {
      points.push(point);
    });
  });

  return points;
};

// Returns a list of wall point vertices that are connected to the given wall.
// For instance a wall that goes from (3,2) to (7,2) will return [(3,2), (4,2), (5,2), (6,2), (7,2)]
export const getWallPoints = (wall: Wall): Set<Vector2d> => {
  return getWallPointsFromCoords(wall.start, wall.end);
};

// Returns a list of wall point vertices that are connected to the given wall.
// For instance a wall that goes from (3,2) to (7,2) will return [(3,2), (4,2), (5,2), (6,2), (7,2)]
export const getWallPointsFromCoords = (
  from: Vector2d,
  to: Vector2d
): Set<Vector2d> => {
  const points: Set<Vector2d> = new Set();

  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;

  const xDirection = deltaX > 0 ? 1 : -1;
  const yDirection = deltaY > 0 ? 1 : -1;

  const xStart = from.x;
  const yStart = from.y;

  const xEnd = to.x;
  const yEnd = to.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // x is the main axis
    for (
      let x = xDirection === 1 ? xStart : xStart - 1;
      xDirection === 1 ? x <= xEnd : x >= xEnd;
      x += xDirection
    ) {
      points.add(new Vector2d(x, yStart));
    }
  } else {
    // y is the main axis
    for (
      let y = yDirection === 1 ? yStart : yStart - 1;
      yDirection === 1 ? y <= yEnd : y >= yEnd;
      y += yDirection
    ) {
      points.add(new Vector2d(xStart, y));
    }
  }

  return points;
};
