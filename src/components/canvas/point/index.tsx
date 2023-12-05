import React, { useEffect } from "react";
import { GridPoint } from "@/types/tiles";
import { useWallToolState } from "@/state/editor/tools/wallToolState";
import { useToolState } from "@/state/editor/tools/toolState";

interface PointProps {
  data: GridPoint;
  gridSize: number;
  pointSize: number;
  color: string;
}

const Point = ({ data, gridSize, pointSize, color }: PointProps) => {
  const [hover, setHover] = React.useState(false);

  const getIsValidLineEndPoint = useWallToolState(
    (state) => state.getIsValidLineEndPoint
  );

  const style = {
    backgroundColor: hover
      ? useWallToolState.getState().lineStart === null
        ? "white"
        : getIsValidLineEndPoint(data.pos)
        ? "white"
        : "red"
      : color,
    left: data.pos.x * gridSize - pointSize / 2 - (hover ? pointSize / 4 : 0),
    top: data.pos.y * gridSize - pointSize / 2 - (hover ? pointSize / 4 : 0),
    width: pointSize + (hover ? pointSize / 2 : 0),
    height: pointSize + (hover ? pointSize / 2 : 0),
    borderRadius: "50%",
  };

  const startLine = (screenX: number, screenY: number) => {
    console.log("start line");
    useWallToolState.getState().setLineStart({
      pointCoord: data.pos,
      screenCoord: { x: screenX, y: screenY },
    });
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onMouseMove = (e: any) => {};

  const onMouseDown = (e: any) => {
    const selectedTool = useToolState.getState().selectedTool;

    switch (selectedTool) {
      case "wall":
        if (useWallToolState.getState().lineStart === null) {
          startLine(e.clientX, e.clientY);
        } else {
          // check if valid
          if (!getIsValidLineEndPoint(data.pos)) return;

          // Okay continue
          console.log("create wall");
          useWallToolState
            .getState()
            .createWall(useWallToolState.getState().lineStart!, {
              pointCoord: data.pos,
              screenCoord: { x: e.clientX, y: e.clientY },
            });

          // Reset the line start to new point
          startLine(e.clientX, e.clientY);

          // TODO: if line end crosses a line, cancel new line making.
        }
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      className="absolute z-20"
    >
      {hover && (
        <div className="absolute w-32 z-50 pointer-events-none select-none">
          {"x: " + data.pos.x + " y: " + data.pos.y}
        </div>
      )}
    </div>
  );
};

export default Point;
