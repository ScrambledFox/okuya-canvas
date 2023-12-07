import { useEditorState } from "@/state/editorState";

export class Vector2d {
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  public static multiply(vector: Vector2d, scalar: number): Vector2d {
    return new Vector2d(vector.x * scalar, vector.y * scalar);
  }

  public static divide(vector: Vector2d, scalar: number): Vector2d {
    return new Vector2d(vector.x / scalar, vector.y / scalar);
  }

  public static subtract(vector1: Vector2d, vector2: Vector2d): Vector2d {
    return new Vector2d(vector1.x - vector2.x, vector1.y - vector2.y);
  }

  public static distanceBetween(vector1: Vector2d, vector2: Vector2d): number {
    return Math.sqrt(
      Math.pow(vector2.x - vector1.x, 2) + Math.pow(vector2.y - vector1.y, 2)
    );
  }
}

export const getPointsAtCoords = (coords: Vector2d[]) => {
  const points = useEditorState.getState().points;
  return coords.map((coord) => getPointAtCoord(coord));
};

export const getPointAtCoord = (coord: Vector2d) => {
  const points = useEditorState.getState().points;
  return points[coord.y][coord.x];
};
