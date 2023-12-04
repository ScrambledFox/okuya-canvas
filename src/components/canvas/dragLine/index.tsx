import { useWallToolState } from "@/state/editor/tools/wallToolState";
import { PointCoord } from "@/types/tiles";
import React, { useEffect, useState } from "react";

interface DragLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const DragLine = () => {
  const start = useWallToolState((state) => state.dragStart);
  const end = useWallToolState((state) => state.dragEnd);

  const [colour, setColour] = useState("white");

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div>
      <svg width="100%" height="100%">
        {/* Render the ghost line while dragging */}
        {start != null && (
          <>
            <line
              x1={start.x}
              y1={start.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#fff"
            />
          </>
        )}
      </svg>

      {/* Draw circle on mousePos */}
      <div
        style={{
          backgroundColor: colour,
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          width: 8,
          height: 8,
          borderRadius: "50%",
        }}
        className="absolute z-10"
      ></div>
    </div>
  );
};

export default DragLine;
