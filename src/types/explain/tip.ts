import { ElementType } from "react";

export interface TipIcon {
  icon: ElementType;
  color: string;
}

export type TipType = "top" | "tip" | "suggestion" | "warning" | "danger";

export type Tip = {
  id: string;
  title: string;
  content: string;
  furnitureId: string;
  image?: string;
  link?: string;
  type: TipType;
};
