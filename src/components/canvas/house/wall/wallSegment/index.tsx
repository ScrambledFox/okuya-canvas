import React from "react";
import { useEditorState } from "@/state/editorState";
import { useToolState } from "@/state/tools/toolState";
import { useSelectToolState } from "@/state/tools/selectToolState";
import WindowGraphics from "../../window";
import { useWindowToolState } from "@/state/tools/windowToolState";
import { Vector2d } from "@/util/points/points";

interface WallSegmentProps {
  wallId: string;
  id: string;
  start: Vector2d;
  end: Vector2d;
  hasWindow: boolean;
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
      case "window":
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
      case "window":
        useWindowToolState.getState().toggleWindow(data.id);
        break;
    }
  };

  const wallStyle = {
    strokeWidth:
      isHovered || parentIsHovered || isSelected || parentIsSelected
        ? "8"
        : "4",
    cursor:
      (selectedTool === "direct-select" && isHovered) || parentIsHovered
        ? "pointer"
        : "default",
  };

  const windowStyle = {
    strokeWidth:
      isHovered || parentIsHovered || isSelected || parentIsSelected
        ? "2"
        : "1",
    cursor:
      (selectedTool === "direct-select" && isHovered) || parentIsHovered
        ? "pointer"
        : "default",
  };

  return data.hasWindow ? (
    <WindowGraphics
      style={windowStyle}
      data={data}
      tileSize={tileSize}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  ) : (
    <WallGraphics
      style={wallStyle}
      data={data}
      tileSize={tileSize}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

const WallGraphics = ({
  style,
  data,
  tileSize,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
}: {
  style: any;
  data: any;
  tileSize: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
}) => {
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
