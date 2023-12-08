import { DragPoint } from "@/types/grid";
import { toggleWindowState } from "@/util/windows/windows";
import { create } from "zustand";

export type WindowToolState = {
  lineStart: DragPoint | null;
  setLineStart: (coord: DragPoint) => void;
  cancelLine: () => void;
  tryCreateWindow: () => void;
  getIsValidLineEndPoint: (coord: DragPoint) => boolean;

  toggleWindow: (segmentId: string) => void;
};

export const useWindowToolState = create<WindowToolState>((set, get) => ({
  lineStart: null,
  setLineStart: (coord) => {
    set({ lineStart: coord });
  },
  cancelLine: () => {
    set({ lineStart: null });
  },
  tryCreateWindow: () => {
    console.log("Creating window");
  },
  getIsValidLineEndPoint: (coord) => {
    return false;
  },

  // Toggle a window on a wall segment with id.
  toggleWindow: (segmentId) => {
    toggleWindowState(segmentId);
  },
}));
