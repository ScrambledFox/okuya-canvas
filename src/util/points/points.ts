import { useEditorState } from "@/state/editorState";

export class Vector2d {
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  public rotateAround(center: Vector2d, angle: number): Vector2d {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const x = this.x - center.x;
    const y = this.y - center.y;

    const newX = x * cos - y * sin;
    const newY = x * sin + y * cos;

    const newVector = new Vector2d(newX + center.x, newY + center.y);

    return new Vector2d(newX + center.x, newY + center.y);
  }

  public get rounded(): Vector2d {
    return new Vector2d(Math.round(this.x), Math.round(this.y));
  }

  public get floored(): Vector2d {
    return new Vector2d(Math.floor(this.x), Math.floor(this.y));
  }

  public get ceiled(): Vector2d {
    return new Vector2d(Math.ceil(this.x), Math.ceil(this.y));
  }

  public get inversed(): Vector2d {
    return new Vector2d(-this.x, -this.y);
  }

  public static multiply(vector: Vector2d, scalar: number): Vector2d {
    return new Vector2d(vector.x * scalar, vector.y * scalar);
  }

  public static divide(vector: Vector2d, scalar: number): Vector2d {
    return new Vector2d(vector.x / scalar, vector.y / scalar);
  }

  public static add(vector1: Vector2d, vector2: Vector2d): Vector2d {
    return new Vector2d(vector1.x + vector2.x, vector1.y + vector2.y);
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
