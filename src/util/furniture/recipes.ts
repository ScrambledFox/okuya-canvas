import { FurnitureType } from "@/types/furniture";

import RecipeDoubleBed from "@/data/furniture/double-bed.json";
import RecipeClCouch from "@/data/furniture/cl-couch.json";

export type FurnitureRecipe = {
  svgPath: string;
  width: number;
  height: number;
  recipe: {
    pattern: string[];
    key: {
      [key: string]: any;
    };
  };
};

const TypeToRecipe = {
  "double-bed": RecipeDoubleBed,
  "cl-couch": RecipeClCouch,
};

// Returns an svg element for the given furniture type
export const getFurnitureRecipe = (type: FurnitureType): FurnitureRecipe => {
  const recipe = TypeToRecipe[type];
  if (recipe === undefined) {
    throw new Error(`No recipe found for furniture type ${type}`);
  }

  return recipe;
};
