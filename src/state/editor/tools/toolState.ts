import { ToolType } from "@/types/tools";
import { create } from "zustand";

export type ToolState = {
  selectedTool: ToolType;
  selectTool: (tool: ToolType) => void;
};

export const useToolState = create<ToolState>((set) => ({
  selectedTool: "wall",
  selectTool: (tool) => set({ selectedTool: tool }),
}));
