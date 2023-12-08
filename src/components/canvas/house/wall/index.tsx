import React from "react";

import { Wall as WallType } from "@/types/inter";
import { useEditorState } from "@/state/editorState";
import { useToolState } from "@/state/tools/toolState";
import { useSelectToolState } from "@/state/tools/selectToolState";
import WallSegment from "./wallSegment";
import { Vector2d } from "@/util/points/points";
import { gridToMeter } from "@/util/coords/coords";

const Wall = ({ data }: { data: WallType }) => {
  const selectedTool = useToolState((state) => state.selectedTool);
  const tileSize = useEditorState((state) => state.tileSize);

  const selected = useSelectToolState(
    (state) => state.selectedObject === data.id
  );

  return (
    // Render a line between the two points
    <>
      {/* Draw Segments */}
      <div id={"segments-" + data.id}>
        {data.segments.map((segment, i) => (
          <WallSegment
            key={i}
            start={segment.start}
            end={segment.end}
            id={segment.id}
            wallId={data.id}
            hasWindow={segment.hasWindow}
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
        {(Vector2d.distanceBetween(data.start, data.end) * gridToMeter)
          .toFixed(2)
          .toString()}
        m
      </h2>
    </>
  );
};

export default Wall;
