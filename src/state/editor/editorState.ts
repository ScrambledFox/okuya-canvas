import { Wall } from "@/types/inter";
import { GridPoint, GridTile } from "@/types/tiles";
import { create } from "zustand";
import { useProcessingState } from "./processingState";

const handleDeleteObjectWithId = (id: string | null) => {
  console.log("Deleting object with id: " + id);
  console.log("STUB: Not implemented yet");

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

  tiles: GridTile[][];
  points: GridPoint[][];
  walls: Wall[];

  setTiles: (newTiles: GridTile[][]) => void;
  resetTiles: () => void;

  setPoints: (newPoints: GridPoint[][]) => void;
  resetPoints: () => void;

  setWalls: (newWalls: Wall[]) => void;
  resetWalls: () => void;

  deleteObjectWithId: (id: string | null) => void;

  addTileFlag: (tile: GridTile, flag: number) => void;
};

export const useEditorState = create<EditorState>((set, get) => ({
  gridSize: { x: 30, y: 30 },
  tileSize: 25,

  mPerPixel: 0.02,

  // Tiles
  tiles: [],
  setTiles: (newTiles) => {
    set({ tiles: newTiles });
  },
  resetTiles: () => set({ tiles: [] }),

  addTileFlag(tile, flag) {
    console.log(
      "Adding flag " + flag + " to tile " + tile.pos.x + ", " + tile.pos.y
    );
    const newTiles = get().tiles;
    newTiles[tile.pos.x][tile.pos.y].flags |= flag;
    set({ tiles: newTiles });
  },

  // Points
  points: [],
  setPoints: (newPoints) => {
    set({ points: newPoints });
  },
  resetPoints: () => set({ points: [] }),

  // Walls
  walls: [],
  setWalls: (newWalls) => {
    set({ walls: newWalls });
    useProcessingState.getState().processTiles();
  },
  resetWalls: () => set({ walls: [] }),

  deleteObjectWithId: (id) => {
    handleDeleteObjectWithId(id);
  },
}));
