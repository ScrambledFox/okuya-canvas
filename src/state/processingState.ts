import { create } from "zustand";
import { useEditorState } from "./editorState";
import { processTiles } from "@/util/tile/tileProcessing";
import { getAllWallPoints } from "@/util/wall/walls";
import { getPointsAtCoords } from "@/util/points/points";

export type ProcessingState = {
  processTiles: () => void;
  processWalls: () => void;
};

export const useProcessingState = create<ProcessingState>((set, get) => ({
  processTiles: () => {
    const tiles = useEditorState.getState().tiles;
    const walls = useEditorState.getState().walls;
    const points = useEditorState.getState().points;

    const tileProcessingOptions = {};

    processTiles(tiles, walls, points, tileProcessingOptions);
  },

  processWalls: () => {
    const walls = useEditorState.getState().walls;
    const wallPoints = getAllWallPoints(walls);
    const pointReferences = getPointsAtCoords(wallPoints);
    useEditorState.getState().setWallPoints(pointReferences);
  },
}));
