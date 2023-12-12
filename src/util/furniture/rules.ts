// This method checks if the tile contains the preferred flag defined in the recipe.

import { GridTile, TileFlags } from "@/types/tiles";

interface Rule {
  ruleFunction: Function;
  values: string[];
}

const getRuleFunction = (ruleFunctionName: string): Function | null => {
  switch (ruleFunctionName) {
    case "preferred":
      return checkPreferredFlag;
    default:
      return null;
  }
};

const splitRuleWithValues = (ruleset: {
  [key: string]: string;
}): Rule | null => {
  if (ruleset === undefined) return null;

  const ruleFunctionName = Object.keys(ruleset)[0];
  const value = ruleset[ruleFunctionName];

  const ruleFunction = getRuleFunction(ruleFunctionName);

  if (ruleFunction === null) return null;

  return {
    ruleFunction: ruleFunction,
    values: value.split(","),
  };
};

export const getRuleFromRecipe = (ruleset: {
  [key: string]: string;
}): Rule | undefined => {
  const rule = splitRuleWithValues(ruleset);

  if (rule === null) return undefined;

  return {
    ruleFunction: rule.ruleFunction,
    values: rule.values,
  };
};

export const getSeverityFromRecipe = (ruleKey: {
  severity: number;
}): number => {
  if (ruleKey === undefined) return 1;
  if (ruleKey.severity === undefined) return 1;

  return ruleKey.severity;
};

// Returns a goodness score for the tile.
export const checkPreferredFlag = (
  tile: GridTile,
  preferred: string[]
): Number => {
  let score = 0;

  if (tile.flags & TileFlags.Wall && preferred.includes("wall")) {
    score += 1;
  }
  if (tile.flags & TileFlags.Wall && preferred.includes("free")) {
    score -= 1;
  }

  return score;
};
