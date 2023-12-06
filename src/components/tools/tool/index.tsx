import { useToolState } from "@/state/editor/tools/toolState";
import { ToolType } from "@/types/tools";
import React, { ElementType, ReactNode } from "react";

interface ToolIconProps {
  icon: ElementType;
  name: string;
  toolType: ToolType;
}

const ToolIcon = (props: ToolIconProps) => {
  // const [hover, setHover] = React.useState(false);
  const selected =
    useToolState((state) => state.selectedTool) === props.toolType;

  const style = {
    color: selected ? "white" : "gray",
  };

  const onSelect = () => {
    useToolState.getState().selectTool(props.toolType);
  };

  return (
    <div
      style={style}
      onClick={onSelect}
      className=" max-h-16 aspect-square flex flex-col justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-pointer"
    >
      <props.icon size={25} />
      <div className="text-sm mt-2">{props.name}</div>
    </div>
  );
};

export default ToolIcon;
