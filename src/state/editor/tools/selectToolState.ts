import { create } from "zustand";
import { useEditorState } from "../editorState";

const handleDeleteSelectedObject = () => {
  const selected = useSelectToolState.getState().selectedObject;
  if (selected === null) return;

  useEditorState.getState().deleteObjectWithId(selected);
};

export type SelectToolState = {
  selectedObject: string | null;
  getHasSelected: () => boolean;

  select: (id: string | null) => void;
  deselect: () => void;

  deleteSelectedObject: () => void;
};

export const useSelectToolState = create<SelectToolState>((set, get) => ({
  selectedObject: null,
  getHasSelected: () => {
    return get().selectedObject !== null;
  },

  select: (id) => set({ selectedObject: id }),
  deselect: () => set({ selectedObject: null }),

  deleteSelectedObject: () => handleDeleteSelectedObject(),
}));
