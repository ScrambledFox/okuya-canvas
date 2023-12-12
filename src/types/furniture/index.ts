import { Vector2d } from "@/util/points/points";

export type FurnitureType = "double-bed" | "cl-couch";

export type Furniture = {
  id: string;
  type: string;
  furnitureType: FurnitureType;
  name: string;
  position: Vector2d;
  rotation: number;
};
