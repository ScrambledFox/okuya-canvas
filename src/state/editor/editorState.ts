import { Wall } from "@/types/inter";
import { create } from "zustand";

export type EditorState = {
  gridSize: { x: number; y: number };
  tileSize: number;

  walls: Wall[];
  setWalls: (newWalls: Wall[]) => void;
  resetWalls: () => void;
  removeWall: (id: string) => void;

  deleteObjectWithId: (id: string | null) => void;
};

const handleDeleteObjectWithId = (id: string | null) => {
  console.log("deleteObjectWithId", id);

  if (id === null) return;
};

export const useEditorState = create<EditorState>((set) => ({
  gridSize: { x: 30, y: 30 },
  tileSize: 25,

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
