import { Wall, WallSegment } from "@/types/inter";
import { PointCoord } from "@/types/tiles";

import { v4 as uuidv4 } from "uuid";

// This method splits a wall line into segments of length 1. It is given that a wall line can only be horizontal or vertical.
export const getSegmentsOfWall = (wall: Wall): WallSegment[] => {
  const segments: WallSegment[] = [];

  const addSegment = (start: PointCoord, end: PointCoord) => {
    const segment: WallSegment = {
      start: start,
      end: end,
      id: uuidv4(),
      type: "wallSegment",
      wallId: wall.id,
    };
    segments.push(segment);
  };

  const deltaX = wall.end.x - wall.start.x;
  const deltaY = wall.end.y - wall.start.y;

  const xDirection = deltaX > 0 ? 1 : -1;
  const yDirection = deltaY > 0 ? 1 : -1;

  const xStart = wall.start.x;
  const yStart = wall.start.y;

  const xEnd = wall.end.x;
  const yEnd = wall.end.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // x is the main axis
    for (
      let x = xDirection === 1 ? xStart : xStart - 1;
      xDirection === 1 ? x < xEnd : x >= xEnd;
      x += xDirection
    ) {
      addSegment({ x: x, y: yStart }, { x: x + 1, y: yStart });
    }
  } else {
    // y is the main axis
    for (
      let y = yDirection === 1 ? yStart : yStart - 1;
      yDirection === 1 ? y < yEnd : y >= yEnd;
      y += yDirection
    ) {
      addSegment({ x: xStart, y: y }, { x: xStart, y: y + 1 });
    }
  }

  return segments;
};
