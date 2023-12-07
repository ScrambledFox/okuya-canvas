import { DragPoint } from "@/types/grid";
import { create } from "zustand";

import { Vector2d } from "@/util/points/points";
import {
  createDoor,
  getIsValidDoorPlacement,
  removeDoor,
} from "@/util/door/doors";

export type DoorToolState = {
  lineStart: DragPoint | null;
  setLineStart: (coord: DragPoint | null) => void;

  lineEndTarget: Vector2d | null;
  setLineEndTarget: (coord: Vector2d | null) => void;

  getIsValidLineEndPoint: (end: Vector2d) => boolean;
  cancelLine: () => void;

  doorTileWidth: number;

  createDoor: (from: Vector2d, to: Vector2d, wallIds: string[]) => void;
  removeDoor: (id: string) => void;
};

export const useDoorToolState = create<DoorToolState>((set, get) => ({
  lineStart: null,
  setLineStart: (dragCoord) => set({ lineStart: dragCoord }),

  lineEndTarget: null,
  setLineEndTarget: (vector) => set({ lineEndTarget: vector }),

  getIsValidLineEndPoint: (end) =>
    getIsValidDoorPlacement(get().lineStart?.pointCoord!, end),
  cancelLine: () => set({ lineStart: null }),

  doorTileWidth: 2,

  createDoor: (start, end, wallIds) => createDoor(start, end, wallIds),
  removeDoor: (id) => removeDoor(id),
}));
