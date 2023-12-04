import { Wall } from "@/types/inter";
import { create } from "zustand";

const handleDeleteObjectWithId = (id: string | null) => {
  console.log("deleteObjectWithId", id);

  if (id === null) return;
};

// Define getMetersFromPixelLength outside the store definition
export const getMetersFromPixelLength = (length: number) => {
  return length * useEditorState.getState().mPerPixel;
};

export type EditorState = {
  gridSize: { x: number; y: number };
  tileSize: number;

  mPerPixel: number;

  walls: Wall[];
  setWalls: (newWalls: Wall[]) => void;
  resetWalls: () => void;
  removeWall: (id: string) => void;

  deleteObjectWithId: (id: string | null) => void;
};

export const useEditorState = create<EditorState>((set) => ({
  gridSize: { x: 30, y: 30 },
  tileSize: 25,

  mPerPixel: 0.02,

  walls: [],
  setWalls: (newWalls) => set({ walls: newWalls }),
  resetWalls: () => set({ walls: [] }),
  removeWall: (id) => {
    const newWalls = useEditorState
      .getState()
      .walls.filter((wall) => wall.id !== id);

    useEditorState.getState().setWalls(newWalls);
  },

  deleteObjectWithId: (id) => {
    handleDeleteObjectWithId(id);
  },
}));
