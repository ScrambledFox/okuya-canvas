import { useEditorState } from "@/state/editor/editorState";
import { useWallToolState } from "@/state/editor/tools/wallToolState";
import { ScreenCoord } from "@/types/grid";
import React, { useEffect, useState } from "react";

interface DragLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const DragLine = () => {
  const start = useWallToolState((state) => state.lineStart);
  const [mousePos, setMousePos] = useState<ScreenCoord | null>(null);

  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const onMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setDistance(
        useEditorState.getState().mPerPixel *
          getLengthInPixels(start!.screenCoord, { x: e.clientX, y: e.clientY })
      );
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [start]);

  const getLengthInPixels = (start: ScreenCoord, end: ScreenCoord) => {
    return Math.sqrt(
      Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2)
    );
  };

  const getMiddlepoint = (start: ScreenCoord, end: ScreenCoord) => {
    return {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
  };

  return (
    <>
      {start != null && mousePos != null && (
        <>
          <svg width="100%" height="100%">
            {/* Render the ghost line while dragging */}
            <line
              x1={start.screenCoord.x}
              y1={start.screenCoord.y}
              x2={mousePos.x}
              y2={mousePos.y}
              stroke="#aaa"
              strokeWidth="2"
            />
          </svg>
          <h2
            style={{
              position: "absolute",
              left: getMiddlepoint(start.screenCoord, mousePos).x,
              top: getMiddlepoint(start.screenCoord, mousePos).y,
              // transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              textShadow: "0px 0px 4px black",
              zIndex: 100,
            }}
          >
            {distance?.toFixed(2).toString()}m
          </h2>
        </>
      )}
    </>
  );
};

export default DragLine;
