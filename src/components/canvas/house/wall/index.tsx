import React, { useEffect, useState } from "react";

import {
  WallSegment as WallSegmentType,
  Wall as WallType,
} from "@/types/inter";
import { useEditorState } from "@/state/editor/editorState";
import { useToolState } from "@/state/editor/tools/toolState";
import { useSelectToolState } from "@/state/editor/tools/selectToolState";
import { useWallToolState } from "@/state/editor/tools/wallToolState";
import { getSegmentsOfWall } from "@/util/wall/walls";
import WallSegment from "./wallSegment";

const Wall = ({ data }: { data: WallType }) => {
  const selectedTool = useToolState((state) => state.selectedTool);
  const tileSize = useEditorState((state) => state.tileSize);

  const [hover, setHover] = useState(false);
  const selected = useSelectToolState(
    (state) => state.selectedObject === data.id
  );

  const [segments, setSegments] = useState<WallSegmentType[]>([]);

  useEffect(() => {
    setSegments(getSegmentsOfWall(data));
  }, [data]);

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
      {/* Draw Segments */}
      <div id={"segments-" + data.id}>
        {segments.map((segment, i) => (
          <WallSegment
            key={i}
            start={segment.start}
            end={segment.end}
            id={segment.id}
            wallId={data.id}
          />
        ))}
      </div>

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
