import { useWallToolState } from "@/state/editor/tools/wallToolState";
import { screenCoord } from "@/types/grid";
import React, { useEffect, useState } from "react";

interface DragLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const DragLine = () => {
  const start = useWallToolState((state) => state.lineStart);
  const [mousePos, setMousePos] = useState<screenCoord | null>(null);

  useEffect(() => {
    const onMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [start]);

  return (
    <svg width="100%" height="100%">
      {/* Render the ghost line while dragging */}
      {start != null && mousePos != null && (
        <>
          <line
            x1={start.screenCoord.x}
            y1={start.screenCoord.y}
            x2={mousePos.x}
            y2={mousePos.y}
            stroke="#aaa"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
};

export default DragLine;
