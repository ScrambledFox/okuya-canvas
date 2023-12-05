import React, { useEffect, useState } from "react";

import { Wall as WallType } from "@/types/inter";
import { useEditorState } from "@/state/editor/editorState";
import { useToolState } from "@/state/editor/tools/toolState";
import { useSelectToolState } from "@/state/editor/tools/selectToolState";
import { useWallToolState } from "@/state/editor/tools/wallToolState";

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
        useWallToolState.getState().removeWall(data.id);
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
      useSelectToolState.getState().select(data.id);
    }
  };
  const style = {
    strokeWidth: hover || selected ? "8" : "4",
  };

  return (
    // Render a line between the two points
    <>
      <svg
        className="absolute z-10 overflow-visible pointer-events-none select-none"
        style={style}
      >
        <line
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          className=" pointer-events-auto select-all hover:cursor-pointer"
          style={style}
          x1={data.start.x * tileSize}
          y1={data.start.y * tileSize}
          x2={data.end.x * tileSize}
          y2={data.end.y * tileSize}
          stroke="#fff"
        />
      </svg>
      <h2
        className="absolute z-50 pointer-events-none select-none"
        style={{
          left: ((data.start.x + data.end.x) / 2) * tileSize,
          top: ((data.start.y + data.end.y) / 2) * tileSize,
        }}
        id="draw-line"
      >
        {/* Calculate length of wall in meters */}
        {(
          Math.sqrt(
            Math.pow(data.start.x - data.end.x, 2) +
              Math.pow(data.start.y - data.end.y, 2)
          ) / 2
        )
          .toFixed(2)
          .toString()}
        m
      </h2>
    </>
  );
};

export default Wall;
