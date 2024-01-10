import { FaCheck } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { FaQuestion } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";

import { v4 as uuidv4 } from "uuid";

import { Tip, TipIcon, TipType } from "@/types/explain/tip";

export const getTipIcon = (tipType: TipType): TipIcon => {
  switch (tipType) {
    case "top":
      return {
        icon: FaCheck,
        color: "green",
      };
    case "tip":
      return {
        icon: FaCheck,
        color: "blue",
      };
    case "suggestion":
      return {
        icon: FaQuestion,
        color: "yellow",
      };
    case "warning":
      return {
        icon: FaExclamation,
        color: "orange",
      };
    case "danger":
      return {
        icon: CgDanger,
        color: "red",
      };
    default:
      return {
        icon: FaCheck,
        color: "green",
      };
  }
};

export const getBedSpaceBothSidesTip = (fId: string): Tip => {
  return {
    id: "bed-space-both-sides",
    title: "Bed has space on both sides",
    content:
      "The bed is approachable from both sides, which is good for a double bed. Now, one person doesn't feel like they're trapped in the bed.",
    furnitureId: fId,
    type: "top",
  };
};

export const getBedSpaceOneSideTip = (fId: string): Tip => {
  return {
    id: "bed-space-one-side",
    title: "Bed has space on one side",
    content:
      "The bed is approachable from one side, which is good for a single bed. However, for a double bed, one person will feel trapped in the bed. Try to make the bed approachable from both sides.",
    furnitureId: fId,
    type: "tip",
  };
};

export const getBedSpaceNoSidesTip = (fId: string): Tip => {
  return {
    id: "bed-space-no-sides",
    title: "Bed has no space on either side",
    content:
      "The bed is approachable from neither side, which is bad for a bed. This way, people must climb over the bed to get in and out. Try to make the bed approachable from at least one side.",
    furnitureId: fId,
    type: "danger",
  };
};

export const getBedCloseToDoorTip = (fId: string): Tip => {
  return {
    id: "bed-close-to-door",
    title: "Bed is too close to the door",
    content:
      "The bed is too close to the door. This is bad as the door might not open or it will be uncomfortable to sleep directly next to the door. Try to move the bed further away from the door.",
    furnitureId: fId,
    type: "warning",
    link: "https://www.thespruce.com/feng-shui-bed-placement-1275062",
  };
};

export const getBedInHighTrafficAreaTip = (fId: string): Tip => {
  return {
    id: "bed-in-high-traffic-area",
    title: "Bed is in a high activity area",
    content:
      "The bed is in a high traffic area. This is bad as people will be walking around the bed often. Try to move the bed to a less busy area. This will also reduce the feeling of pressure while sleeping.",
    furnitureId: fId,
    type: "warning",
    link: "https://www.thespruce.com/feng-shui-bed-placement-1275062",
  };
};
