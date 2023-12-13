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
    case "not-allowed":
      return checkNotAllowedFlag;
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

export const getSeveritiesFromRecipe = (ruleKey: {
  severity: number;
}): number[] => {
  const severities: number[] = [];

  const severity = getSeverityFromRecipe(ruleKey);
  if (severity !== undefined) {
    severities.push(severity);
  }

  return severities;
};

// Returns a goodness score for the tile.
export const checkPreferredFlag = (
  tile: GridTile,
  preferred: string[]
): Number => {
  let score = 0;

  const containedFurniture = tile.containingFurniture;
  containedFurniture.forEach((furniture) => {
    if (preferred.includes(furniture.furnitureType)) {
      score += 1;
    }
  });

  if (tile.flags & TileFlags.Wall && preferred.includes("wall")) {
    score += 1;
  }
  if (tile.flags & TileFlags.Wall && preferred.includes("free")) {
    score -= 1;
  }

  return score;
};

export const checkNotAllowedFlag = (
  tile: GridTile,
  notAllowed: string[]
): Number => {
  let score = 0;

  const containedFurniture = tile.containingFurniture;
  containedFurniture.forEach((furniture) => {
    if (notAllowed.includes(furniture.furnitureType)) {
      score -= 1;
    }
  });

  if (tile.flags & TileFlags.Wall && notAllowed.includes("wall")) {
    score -= 1;
  }
  if (tile.flags & TileFlags.Wall && notAllowed.includes("free")) {
    score += 1;
  }

  return score;
};
