import DragLine from "@/components/canvas/dragLine";
import { useWallToolState } from "@/state/editor/tools/wallToolState";
import React, { useEffect } from "react";

const WallToolDrawer = () => {
  const isDragging = useWallToolState((state) => state.lineStart != null);

  useEffect(() => {
    const onKeyUp = (e: any) => {
      if (e.key === "Escape") {
        useWallToolState.getState().cancelLine();
      }
    };

    window.addEventListener("keydown", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  });

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-100 pointer-events-none select-none"
      id="draw-line"
    >
      {isDragging && <DragLine />}
    </div>
  );
};

export default WallToolDrawer;
