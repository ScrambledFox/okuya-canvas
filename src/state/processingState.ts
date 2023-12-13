import { create } from "zustand";
import { useEditorState } from "./editorState";
import { processTiles } from "@/util/tiles/tileProcessing";
import { getAllWallPoints } from "@/util/walls/walls";
import { getPointsAtCoords } from "@/util/points/points";
import { useFurnitureState } from "./furnitureState";
import { calculateScore } from "@/util/furniture/score";

export type ProcessingState = {
  processTiles: () => void;
  processWalls: () => void;
  calculateFurnitureScores: () => void;
};

export const processAllObjects = () => {
  useProcessingState.getState().processTiles();
  useProcessingState.getState().processWalls();
  useProcessingState.getState().calculateFurnitureScores();
  useEditorState.getState().updateIdDictionary();
};

export const useProcessingState = create<ProcessingState>((set, get) => ({
  processTiles: () => {
    const tiles = useEditorState.getState().tiles;
    const walls = useEditorState.getState().walls;
    const points = useEditorState.getState().points;
    const doors = useEditorState.getState().doors;
    const furniture = useFurnitureState.getState().furniture;

    const tileProcessingOptions = {};

    processTiles(tiles, walls, points, doors, furniture, tileProcessingOptions);
  },

  processWalls: () => {
    const walls = useEditorState.getState().walls;
    const wallPoints = getAllWallPoints(walls);
    const pointReferences = getPointsAtCoords(wallPoints);
    useEditorState.getState().setWallPoints(pointReferences);
  },

  calculateFurnitureScores: () => {
    const furniture = useFurnitureState.getState().furniture;
    useFurnitureState.getState().resetScore();
    furniture.forEach((f) => {
      f.score = calculateScore(f);
      useFurnitureState.getState().addScore(f.score);
    });
    useFurnitureState.getState().setFurnitureWithoutProcessing(furniture);
  },
}));
