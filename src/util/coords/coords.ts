import { useEditorState } from "@/state/editorState";
import { Line } from "../line/lines";
import { Vector2d } from "../points/points";

export const gridToMeter = 0.5;
export const meterToGrid = 1 / gridToMeter;

export const gridToPixels =
  useEditorState.getState().tileSize * useEditorState.getState().zoomLevel;
export const pixelsToGrid = 1 / gridToPixels;

// Return a perpendicular line from the start that fits best within the grid with the target 'end' point.
// Limits the line to a minimum and maximum length.
export const getManhattanLine = (
  start: Vector2d,
  end: Vector2d,
  minLength: number = 0,
  maxLength: number = Number.MAX_VALUE
) => {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;

  const xDirection = deltaX > 0 ? 1 : -1;
  const yDirection = deltaY > 0 ? 1 : -1;

  const xStart = start.x;
  const yStart = start.y;

  const xEnd = end.x;
  const yEnd = end.y;

  let line = new Line();
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // x is the main axis
    let x = xDirection === 1 ? xEnd : xEnd - 1;
    let y = yStart;
    line = new Line(xStart, yStart, x, y);
  } else {
    // y is the main axis
    let x = xStart;
    let y = yDirection === 1 ? yEnd : yEnd - 1;
    line = new Line(xStart, yStart, x, y);
  }

  const newLength = Math.max(Math.min(line.length, maxLength), minLength);
  return line.getWithLength(newLength);
};

export const getCoordsInBetween = (
  start: Vector2d,
  end: Vector2d
): Set<Vector2d> => {
  const coords: Set<Vector2d> = new Set();

  // Calculate the differences between start and end coordinates
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Determine the number of steps based on the maximum difference
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  // Calculate the incremental change in x and y for each step
  const incrementX = dx / steps;
  const incrementY = dy / steps;

  // Generate coordinates for each step
  for (let i = 0; i <= steps; i++) {
    const x = start.x + i * incrementX;
    const y = start.y + i * incrementY;
    coords.add(new Vector2d(x, y));
  }

  return coords;
};

export const setHasCoord = (
  coords: Set<Vector2d>,
  coord: Vector2d
): boolean => {
  return [...coords].some((c) => c.x === coord.x && c.y === coord.y);
};
