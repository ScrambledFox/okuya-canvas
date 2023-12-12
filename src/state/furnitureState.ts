import { Furniture, FurnitureType } from "@/types/furniture";
import { create } from "zustand";
import { Vector2d } from "@/util/points/points";

import { v4 as uuidv4 } from "uuid";
import { useProcessingState } from "./processingState";
import { useEditorState } from "./editorState";

export const processFurnitureScores = () => {
  useProcessingState.getState().processTiles();
  useEditorState.getState().updateIdDictionary();
};

export type FurnitureState = {
  furniture: Furniture[];
  setFurniture: (newFurniture: Furniture[]) => void;
  resetFurniture: () => void;

  addFurniture: (name: string, type: FurnitureType) => void;
  moveFurnitureTo: (id: string, position: Vector2d) => void;
  moveFurniture: (id: string, position: Vector2d) => void;
  rotateFurniture: (id: string, rotation: number) => void;
  removeFurniture: (id: string) => void;
};

export const useFurnitureState = create<FurnitureState>((set, get) => ({
  furniture: [],
  setFurniture: (newFurniture) => {
    set({ furniture: newFurniture });
    processFurnitureScores();
  },
  resetFurniture: () => {
    set({ furniture: [] });
    processFurnitureScores();
  },

  addFurniture: (name, type) => {
    const newFurniture: Furniture = {
      id: uuidv4(),
      name,
      type: "furniture",
      furnitureType: type,
      position: { x: 0, y: 0 },
      rotation: 0,
    };
    set({ furniture: [...get().furniture, newFurniture] });
    processFurnitureScores();
  },
  moveFurnitureTo: (id, position) => {
    const newFurniture = get().furniture.map((f) => {
      if (f.id === id) {
        return { ...f, position };
      }
      return f;
    });
    set({ furniture: newFurniture });
    processFurnitureScores();
  },
  moveFurniture: (id, position) => {
    const newFurniture = get().furniture.map((f) => {
      if (f.id === id) {
        return {
          ...f,
          position: {
            x: f.position.x + position.x,
            y: f.position.y + position.y,
          },
        };
      }
      return f;
    });
    set({ furniture: newFurniture });
    processFurnitureScores();
  },
  rotateFurniture: (id, rotation) => {
    const newFurniture = get().furniture.map((f) => {
      if (f.id === id) {
        return { ...f, rotation };
      }
      return f;
    });
    set({ furniture: newFurniture });
    processFurnitureScores();
  },
  removeFurniture: (id) => {
    const newFurniture = get().furniture.filter((f) => f.id !== id);
    set({ furniture: newFurniture });
    processFurnitureScores();
  },
}));
