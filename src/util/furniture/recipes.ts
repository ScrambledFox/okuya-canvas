import { Furniture, FurnitureType } from "@/types/furniture";

import RecipeDoubleBed from "@/data/furniture/double-bed.json";
import RecipeClCouch from "@/data/furniture/cl-couch.json";
import RecipeEndtable from "@/data/furniture/endtable.json";
import RecipeRoundTable from "@/data/furniture/round-table.json";
import RecipeTable from "@/data/furniture/table.json";
import RecipeChair from "@/data/furniture/chair.json";

import { Vector2d } from "../points/points";
import { rotateMatrix } from "../math/matrix";

export type FurnitureRecipe = {
  svgPath: string;
  width: number;
  height: number;
  price: number;
  recipe: {
    shape: string[];
    pattern: string[];
    key: {
      [key: string]: any;
    };
  };
};

const TypeToRecipe = {
  "double-bed": RecipeDoubleBed,
  "cl-couch": RecipeClCouch,
  endtable: RecipeEndtable,
  "round-table": RecipeRoundTable,
  table: RecipeTable,
  chair: RecipeChair,
};

// Returns an svg element for the given furniture type
export const getFurnitureRecipe = (type: FurnitureType): FurnitureRecipe => {
  const recipe = TypeToRecipe[type];
  if (recipe === undefined) {
    throw new Error(`No recipe found for furniture type ${type}`);
  }

  return recipe;
};

export const isInShape = (pos: Vector2d, f: Furniture): boolean => {
  const x = pos.x;
  const y = pos.y;

  const rec = getFurnitureRecipe(f.furnitureType);
  const shape = rec.recipe.shape.map((row) => row.split(""));
  const rotatedShape = rotateMatrix(shape, f.rotation);

  if (x < 0 || y < 0) return true;
  if (x >= rotatedShape[0].length || y >= rotatedShape.length) return true;

  // Check if the position is within the shape
  if (rotatedShape[y][x] === "x") return true;

  return false;
};
