import SelectableIcon from "@/components/ui/selectableIcon";
import { useSelectToolState } from "@/state/tools/selectToolState";
import { useToolState } from "@/state/tools/toolState";
import { ToolType } from "@/types/tools";
import React, { ElementType, ReactNode } from "react";

interface ToolIconProps {
  icon: ElementType;
  name: string;
  toolType: ToolType;
  actionOnSelect?: () => void;
}

const ToolIcon = (props: ToolIconProps) => {
  // const [hover, setHover] = React.useState(false);
  const selected =
    useToolState((state) => state.selectedTool) === props.toolType;

  const onSelect = () => {
    if (props.actionOnSelect !== undefined) props.actionOnSelect();

    useSelectToolState.getState().deselect();
    useToolState.getState().selectTool(props.toolType);
  };

  return (
    <SelectableIcon
      icon={props.icon}
      name={props.name}
      onSelect={onSelect}
      selected={selected}
    />
  );
};

export default ToolIcon;
