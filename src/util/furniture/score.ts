// Score.ts calculates the score of a furniture placement, based on the furniture recipes.
// 1. Get the recipe for the furniture type
// 2. Get the tiles under the furniture
// 3. For each tile, get the appropriate tile in the recipe by index.
// 4. Check rule for that tile in recipe by looking at key and getting the rules.
// 5. If rule is satisfied, add to score.
// 6. Return score.

import { Furniture } from "@/types/furniture";
import { getFurnitureRecipe } from "./recipes";
import { getFurnitureTiles } from "../tiles/tiles";
import { getRuleFromRecipe, getSeverityFromRecipe } from "./rules";
import { useEditorState } from "@/state/editorState";
import { TileFlags } from "@/types/tiles";
import { rotateMatrix } from "../math/matrix";

export const calculateScore = (furniture: Furniture): number => {
  const rec = getFurnitureRecipe(furniture.furnitureType);
  const tiles = getFurnitureTiles(furniture);

  let score = 0;

  let iterator = tiles.values();
  for (let i = 0; i < tiles.size; i++) {
    const tile = iterator.next().value;

    console.log(i, tile.pos);

    const unfoldedecipePattern = rec.recipe.pattern.map((row) => row.split(""));
    const rotatedRecipePattern = rotateMatrix(
      unfoldedecipePattern,
      furniture.rotation
    );

    const recipeX = i % rotatedRecipePattern.length;
    const recipeY = Math.floor(i / rotatedRecipePattern.length);
    const recipeTile = rotatedRecipePattern[recipeX][recipeY];
    console.log(recipeX, recipeY);
    console.log(recipeTile);
    console.log(rotatedRecipePattern);

    const rule = getRuleFromRecipe(rec.recipe.key[recipeTile]);
    const severity = getSeverityFromRecipe(rec.recipe.key[recipeTile]);
    if (rule === undefined) continue;

    const tileScore = rule.ruleFunction(tile, rule.values);
    if (tileScore === 0) continue;
    score += tileScore * severity;

    // Test visuals
    useEditorState.getState().addTileFlag(tile, TileFlags.RuleAffected);
  }

  return score;
};
