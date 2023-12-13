import { Tip } from "@/types/explain/tip";
import { create } from "zustand";

export type TipState = {
  tips: Tip[];
  setTips: (newTips: Tip[]) => void;
  resetTips: () => void;

  addTip: (newTip: Tip) => void;

  getTipsForId: (id: string) => Tip[];
};

export const useTipState = create<TipState>((set, get) => ({
  tips: [],
  setTips: (newTips) => set({ tips: newTips }),
  resetTips: () => set({ tips: [] }),

  addTip: (newTip) => {
    const tips = get().tips;
    const tipIds = tips.map((tip) => tip.id);
    if (!tipIds.includes(newTip.id)) {
      tips.push(newTip);
      set({ tips: tips });
    }
  },

  getTipsForId: (id) => get().tips.filter((tip) => tip.furnitureId === id),
}));
