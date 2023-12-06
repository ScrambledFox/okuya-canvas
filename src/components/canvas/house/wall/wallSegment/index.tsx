import React, { useState } from "react";
import { useEditorState } from "@/state/editor/editorState";
import { useToolState } from "@/state/editor/tools/toolState";
import { useSelectToolState } from "@/state/editor/tools/selectToolState";

interface WallSegmentProps {
  wallId: string;
  id: string;
  start: { x: number; y: number };
  end: { x: number; y: number };
}

const WallSegment = (data: WallSegmentProps) => {
  const selectedTool = useToolState((state) => state.selectedTool);

  const isHovered = useSelectToolState(
    (state) => state.hoveredObject === data.id
  );
  const parentIsHovered = useSelectToolState(
    (state) => state.hoveredObject === data.wallId
  );

  const isSelected = useSelectToolState(
    (state) => state.selectedObject === data.id
  );
  const parentIsSelected = useSelectToolState(
    (state) => state.selectedObject === data.wallId
  );

  const tileSize = useEditorState((state) => state.tileSize);

  const onMouseEnter = () => {
    switch (selectedTool) {
      case "select":
        useSelectToolState.getState().setHoveredObject(data.wallId);
        break;
      case "direct-select":
        useSelectToolState.getState().setHoveredObject(data.id);
        break;
    }
  };

  const onMouseLeave = () => {
    useSelectToolState.getState().unsetHoveredObject();
  };

  const onMouseDown = () => {
    switch (selectedTool) {
      case "select":
        useSelectToolState.getState().select(data.wallId);
        break;
      case "direct-select":
        useSelectToolState.getState().select(data.id);
        break;
    }
  };

  const style = {
    strokeWidth:
      isHovered || parentIsHovered || isSelected || parentIsSelected
        ? "8"
        : "4",
    cursor:
      (selectedTool === "direct-select" && isHovered) || parentIsHovered
        ? "pointer"
        : "default",
  };

  return (
    <svg
      className="absolute z-10 overflow-visible pointer-events-none select-none"
      style={style}
    >
      <line
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        className="pointer-events-auto select-all"
        style={style}
        x1={data.start.x * tileSize}
        y1={data.start.y * tileSize}
        x2={data.end.x * tileSize}
        y2={data.end.y * tileSize}
        stroke="#fff"
      />
    </svg>
  );
};

export default WallSegment;
