import React, { ElementType, ReactNode } from "react";

interface SelectableIconProps {
  icon: ElementType;
  name: string;
  selected: boolean;
  onSelect: () => void;
}

const SelectableIcon = (props: SelectableIconProps) => {
  const style = {
    color: props.selected ? "white" : "gray",
  };

  return (
    <div
      style={style}
      onClick={props.onSelect}
      className="max-h-20 aspect-square flex flex-col text-center justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer"
    >
      <props.icon size={25} />
      <div className="text-sm mt-2 w-full break-words">{props.name}</div>
    </div>
  );
};

export default SelectableIcon;
