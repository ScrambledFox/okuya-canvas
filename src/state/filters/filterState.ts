import { create } from "zustand";

export type FilterState = {
  filter: number;
  addFilter: (filter: number) => void;
  setFilter: (filter: number) => void;
  unsetFilter: () => void;
};

export const useFilterState = create<FilterState>((set, get) => ({
  filter: 0,
  addFilter: (filter) => set({ filter: get().filter | filter }),
  setFilter: (filter) => set({ filter }),
  unsetFilter: () => set({ filter: 0 }),
}));
