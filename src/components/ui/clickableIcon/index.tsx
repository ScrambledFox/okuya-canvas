import React, { ElementType } from "react";

interface ClickableIconProps {
  icon: ElementType;
  name: string;
  onClick: () => void;
}

const ClickableIcon = (props: ClickableIconProps) => {
  const style = {
    color: "gray",
  };

  return (
    <div
      style={style}
      className="max-h-16 aspect-square flex flex-col text-center justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer select-none"
      onClick={props.onClick}
    >
      <props.icon size={25} />
      <div className="text-sm mt-2">{props.name}</div>
    </div>
  );
};

export default ClickableIcon;
