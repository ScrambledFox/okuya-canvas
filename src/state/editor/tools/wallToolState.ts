// Wall Tool state to handle wall creation and ghost line rendering
import { create } from "zustand";

import { Wall } from "@/types/inter";
import { DragPoint } from "@/types/grid";

import { v4 as uuidv4 } from "uuid";
import { useEditorState } from "../editorState";

export type WallToolState = {
  lineStart: DragPoint | null;
  setLineStart: (coord: DragPoint | null) => void;
  cancelLine: () => void;

  createWall: (from: DragPoint, to: DragPoint) => void;
  deleteWall: (id: string) => void;
};

const createWall = (start: DragPoint, end: DragPoint) => {
  const wall: Wall = {
    id: uuidv4(),
    from: start.pointCoord,
    to: end.pointCoord,
    type: "wall",
  };

  useEditorState
    .getState()
    .setWalls([...useEditorState.getState().walls, wall]);
};

const deleteWall = (id: string) => {};

export const useWallToolState = create<WallToolState>((set) => ({
  lineStart: null,
  setLineStart: (data) => set({ lineStart: data }),
  cancelLine: () => set({ lineStart: null }),

  createWall: (lineStart, lineEnd) => createWall(lineStart, lineEnd),
  deleteWall: (id) => deleteWall(id),
}));
