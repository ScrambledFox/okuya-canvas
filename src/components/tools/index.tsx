import React from "react";
import ToolIcon from "./tool";

import { FaHandPointer } from "react-icons/fa";
import { FaRegHandPointer } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { FaDoorClosed } from "react-icons/fa";
import { TbWindow } from "react-icons/tb";

import { FaDev } from "react-icons/fa";

const ToolBar = () => {
  return (
    <div className="fixed top-8 left-8 bg-neutral-950 p-2 border border-neutral-700 rounded-lg">
      <ToolIcon name="Select" toolType="select" icon={FaRegHandPointer} />
      <ToolIcon
        name="Direct Select"
        toolType="direct-select"
        icon={FaHandPointer}
      />
      <ToolIcon name="Wall" toolType="wall" icon={GiBrickWall} />
      <ToolIcon name="Door" toolType="door" icon={FaDoorClosed} />
      <ToolIcon name="Window" toolType="window" icon={TbWindow} />
      <ToolIcon name="Floodfill" toolType="dev-floodfill" icon={FaDev} />
    </div>
  );
};

export default ToolBar;
