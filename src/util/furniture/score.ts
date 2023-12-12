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

    const unfoldedecipePattern = rec.recipe.pattern.map((row) => row.split(""));
    const rotatedRecipePattern = rotateMatrix(
      unfoldedecipePattern,
      furniture.rotation
    );

    const recipeX = i % rotatedRecipePattern.length;
    const recipeY = Math.floor(i / rotatedRecipePattern.length);
    const recipeTile = rotatedRecipePattern[recipeX][recipeY];

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
