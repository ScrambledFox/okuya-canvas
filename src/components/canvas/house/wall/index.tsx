import React, { useEffect, useState } from "react";

import { Wall as WallType } from "@/types/inter";
import { useEditorState } from "@/state/editor/editorState";
import { useToolState } from "@/state/editor/tools/toolState";
import { useSelectToolState } from "@/state/editor/tools/selectToolState";

const Wall = ({ data }: { data: WallType }) => {
  const selectedTool = useToolState((state) => state.selectedTool);
  const tileSize = useEditorState((state) => state.tileSize);

  const [hover, setHover] = useState(false);
  const selected = useSelectToolState(
    (state) => state.selectedObject === data.id
  );

  useEffect(() => {
    const onKeyUp = (e: any) => {
      if (!selected) return;

      if (e.key === "Delete") {
        useEditorState.getState().removeWall(data.id);
      }
    };

    window.addEventListener("keydown", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  });

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onMouseDown = () => {
    if (selectedTool === "select") {
      useSelectToolState.getState().selectObject(data.id);
    }
  };
  const style = {
    strokeWidth: hover || selected ? "8" : "4",
  };

  return (
    // Render a line between the two points
    <svg
      className="absolute z-100 overflow-visible hover:cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      style={style}
    >
      <line
        style={style}
        x1={data.from.x * tileSize}
        y1={data.from.y * tileSize}
        x2={data.to.x * tileSize}
        y2={data.to.y * tileSize}
        stroke="#fff"
      />
    </svg>
  );
};

export default Wall;
