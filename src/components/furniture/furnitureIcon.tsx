import { ElementType, useState } from "react";
import ClickableIcon from "../ui/clickableIcon";
import { FurnitureType } from "@/types/furniture";
import { useFurnitureState } from "@/state/furnitureState";

type FurnitureIconProps = {
  type: FurnitureType;
  name: string;
  icon: ElementType;
};

const FurnitureIcon = ({ name, icon, ...props }: FurnitureIconProps) => {
  const onClick = () => {
    useFurnitureState.getState().addFurniture(name, props.type);
  };

  return <ClickableIcon icon={icon} name={name} onClick={onClick} />;
};

export default FurnitureIcon;
