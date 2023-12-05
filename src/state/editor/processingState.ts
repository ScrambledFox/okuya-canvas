import { create } from "zustand";
import { useEditorState } from "./editorState";
import { processTiles } from "@/util/tile/tileProcessing";

export type ProcessingState = {
  processTiles: () => void;
};

export const useProcessingState = create<ProcessingState>((set, get) => ({
  processTiles: () => {
    const tiles = useEditorState.getState().tiles;
    const walls = useEditorState.getState().walls;
    const points = useEditorState.getState().points;

    const tileProcessingOptions = {};

    processTiles(tiles, walls, points, tileProcessingOptions);
  },
}));
