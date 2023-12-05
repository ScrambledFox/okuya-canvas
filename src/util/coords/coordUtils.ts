// Return a perpendicular line from the start that fits best within the grid with the target 'end' point.
export const getManhattanCoord = (
  start: { x: number; y: number },
  end: { x: number; y: number }
) => {
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
    return {
      x: xDirection === 1 ? xEnd : xEnd - 1,
      y: yStart,
    };
  } else {
    // y is the main axis
    return {
      x: xStart,
      y: yDirection === 1 ? yEnd : yEnd - 1,
    };
  }
};
