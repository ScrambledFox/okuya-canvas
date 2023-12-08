import { ElementType } from "react";
import { Furniture } from "@/types/furniture";
import SelectableIcon from "../ui/selectableIcon";

type FurnitureIconProps = {
  name: string;
  icon: ElementType;
};

const FurnitureIcon = ({ name, icon, ...props }: FurnitureIconProps) => {
  const onSelect = () => {};

  return (
    <SelectableIcon
      icon={icon}
      name={name}
      onSelect={onSelect}
      selected={false}
    />
  );
};

export default FurnitureIcon;
