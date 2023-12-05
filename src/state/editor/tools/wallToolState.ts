// Wall Tool state to handle wall creation and ghost line rendering
import { create } from "zustand";

import { Wall } from "@/types/inter";
import { DragPoint } from "@/types/grid";

import { v4 as uuidv4 } from "uuid";
import { useEditorState } from "../editorState";
import { PointCoord } from "@/types/tiles";

export type WallToolState = {
  lineStart: DragPoint | null;
  setLineStart: (coord: DragPoint | null) => void;
  getIsValidLineEndPoint: (end: PointCoord) => boolean;
  cancelLine: () => void;

  createWall: (from: DragPoint, to: DragPoint) => void;
  removeWall: (id: string) => void;
};

const createWall = (start: DragPoint, end: DragPoint) => {
  const wall: Wall = {
    id: uuidv4(),
    start: start.pointCoord,
    end: end.pointCoord,
    type: "wall",
  };

  useEditorState
    .getState()
    .setWalls([...useEditorState.getState().walls, wall]);
};

const getValidWallPlacement = (start: PointCoord, end: PointCoord) => {
  if (start == null || end == null) return false;

  if (start === end) return false;

  if (start.x !== end.x) {
    if (start.y !== end.y) {
      return false;
    }
  }

  return true;
};

const deleteWall = (id: string) => {
  const newWalls = useEditorState
    .getState()
    .walls.filter((wall) => wall.id !== id);

  useEditorState.getState().setWalls(newWalls);
};

export const useWallToolState = create<WallToolState>((set, get) => ({
  lineStart: null,
  setLineStart: (data) => set({ lineStart: data }),
  getIsValidLineEndPoint: (end) =>
    getValidWallPlacement(get().lineStart?.pointCoord!, end),
  cancelLine: () => set({ lineStart: null }),

  createWall: (lineStart, lineEnd) => createWall(lineStart, lineEnd),
  removeWall: (id) => deleteWall(id),
}));
