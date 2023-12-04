import DragLine from "@/components/canvas/dragLine";
import { useWallToolState } from "@/state/editor/tools/wallToolState";
import React from "react";

const WallToolDrawer = () => {
  const isDragging = useWallToolState((state) => state.dragStart != null);

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
