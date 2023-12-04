import { create } from "zustand";
import { useEditorState } from "../editorState";

export type SelectToolState = {
  selectedObject: string | null;
  selectObject: (id: string | null) => void;

  deleteSelectedObject: () => void;
};

const handleDeleteSelectedObject = () => {
  const selected = useSelectToolState.getState().selectedObject;
  if (selected === null) return;

  useEditorState.getState().deleteObjectWithId(selected);
};

export const useSelectToolState = create<SelectToolState>((set) => ({
  selectedObject: null,
  selectObject: (id) => set({ selectedObject: id }),

  deleteSelectedObject: () => handleDeleteSelectedObject(),
}));
