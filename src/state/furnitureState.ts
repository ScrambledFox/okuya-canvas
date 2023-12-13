import { Furniture, FurnitureType } from "@/types/furniture";
import { create } from "zustand";
import { Vector2d } from "@/util/points/points";

import { v4 as uuidv4 } from "uuid";
import { processAllObjects, useProcessingState } from "./processingState";
import { useEditorState } from "./editorState";

export type FurnitureState = {
  furniture: Furniture[];
  setFurnitureWithoutProcessing: (newFurniture: Furniture[]) => void;
  setFurniture: (newFurniture: Furniture[]) => void;
  resetFurniture: () => void;

  addFurniture: (name: string, type: FurnitureType) => void;
  moveFurnitureTo: (id: string, position: Vector2d) => void;
  moveFurniture: (id: string, position: Vector2d) => void;
  rotateFurniture: (id: string, rotation: number) => void;
  removeFurniture: (id: string) => void;

  budget: number;
  usedBudget: number;
  score: number;
  setScore: (newScore: number) => void;
  resetScore: () => void;
  addScore: (score: number) => void;
};

export const useFurnitureState = create<FurnitureState>((set, get) => ({
  furniture: [],
  setFurnitureWithoutProcessing: (newFurniture) => {
    set({ furniture: newFurniture });
  },
  setFurniture: (newFurniture) => {
    set({ furniture: newFurniture });
    processAllObjects();
  },
  resetFurniture: () => {
    set({ furniture: [] });
    processAllObjects();
  },

  addFurniture: (name, type) => {
    const newFurniture: Furniture = {
      id: uuidv4(),
      name,
      type: "furniture",
      score: 0,
      furnitureType: type,
      position: new Vector2d(0, 0),
      rotation: 0,
    };
    set({ furniture: [...get().furniture, newFurniture] });
    processAllObjects();
  },
  moveFurnitureTo: (id, position) => {
    const newFurniture = get().furniture.map((f) => {
      if (f.id === id) {
        const clampedPosition = new Vector2d(
          Math.max(
            0,
            Math.min(position.x, useEditorState.getState().gridSize.x)
          ),
          Math.max(
            0,
            Math.min(position.y, useEditorState.getState().gridSize.y)
          )
        );
        return { ...f, position: clampedPosition };
      }
      return f;
    });
    set({ furniture: newFurniture });
    processAllObjects();
  },
  moveFurniture: (id, position) => {
    const newFurniture = get().furniture.map((f) => {
      if (f.id === id) {
        const clampedPosition = new Vector2d(
          Math.max(
            0,
            Math.min(
              f.position.x + position.x,
              useEditorState.getState().gridSize.x
            )
          ),
          Math.max(
            0,
            Math.min(
              f.position.y + position.y,
              useEditorState.getState().gridSize.y
            )
          )
        );
        return {
          ...f,
          position: clampedPosition,
        };
      }
      return f;
    });
    set({ furniture: newFurniture });
    processAllObjects();
  },
  rotateFurniture: (id, rotation) => {
    const newFurniture = get().furniture.map((f) => {
      if (f.id === id) {
        return { ...f, rotation };
      }
      return f;
    });
    set({ furniture: newFurniture });
    processAllObjects();
  },
  removeFurniture: (id) => {
    const newFurniture = get().furniture.filter((f) => f.id !== id);
    set({ furniture: newFurniture });
    processAllObjects();
  },

  budget: 1000,
  usedBudget: 0,
  score: 0,
  setScore: (newScore) => set({ score: newScore }),
  resetScore: () => set({ score: 0 }),
  addScore: (score) => set({ score: get().score + score }),
}));
