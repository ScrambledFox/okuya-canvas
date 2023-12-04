// Wall Tool state to handle wall creation and ghost line rendering
import { create } from "zustand";

import { Wall } from "@/types/inter";
import { PointCoord } from "@/types/tiles";

export type WallToolState = {
  dragStart: PointCoord | null;
  dragEnd: PointCoord | null;
  setDragStart: (coord: PointCoord) => void;
  setDragEnd: (coord: PointCoord) => void;

  walls: Wall[];

  setWalls: (walls: Wall[]) => void;
  resetWalls: () => void;
  createWall: () => void;
  deleteWall: (id: string) => void;
};

const createWall = () => {};

const deleteWall = (id: string) => {};

export const useWallToolState = create<WallToolState>((set) => ({
  dragStart: null,
  dragEnd: null,
  setDragStart: (coord) => set({ dragStart: coord }),
  setDragEnd: (coord) => set({ dragEnd: coord }),

  walls: [],

  setWalls: (walls) => set({ walls }),
  resetWalls: () => set({ walls: [] }),
  createWall: () => createWall(),
  deleteWall: (id) => deleteWall(id),
}));
