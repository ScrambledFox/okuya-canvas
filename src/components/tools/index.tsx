import React from "react";
import ToolIcon from "./tool";

import { FaHandPointer } from "react-icons/fa";
import { FaRegHandPointer } from "react-icons/fa";
import { TbPointer } from "react-icons/tb";
import { TbPointerFilled } from "react-icons/tb";
import { GiBrickWall } from "react-icons/gi";
import { FaDoorClosed } from "react-icons/fa";
import { TbWindow } from "react-icons/tb";

import { FaDev } from "react-icons/fa";
import Container from "../ui/container";

const ToolBar = () => {
  const onDoorSelect = () => {
    console.log("Door selected!");
  };

  return (
    <Container className="top-2 left-2">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">Tools</h1>
      </div>
      <ToolIcon name="Select" toolType="select" icon={FaRegHandPointer} />
      <ToolIcon
        name="Direct Select"
        toolType="direct-select"
        icon={TbPointerFilled}
      />
      <ToolIcon name="Wall" toolType="wall" icon={GiBrickWall} />
      <ToolIcon
        name="Door"
        toolType="door"
        actionOnSelect={onDoorSelect}
        icon={FaDoorClosed}
      />
      <ToolIcon name="Window" toolType="window" icon={TbWindow} />
      <ToolIcon name="Floodfill" toolType="dev-floodfill" icon={FaDev} />
    </Container>
  );
};

export default ToolBar;
