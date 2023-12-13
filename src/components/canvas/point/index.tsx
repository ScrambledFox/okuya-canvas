import React, { MouseEvent } from "react";

import { GridPoint } from "@/types/tiles";
import { useWallToolState } from "@/state/tools/wallToolState";
import { useToolState } from "@/state/tools/toolState";
import { useDoorToolState } from "@/state/tools/doorToolState";
import { endWallPlacement, startWallPlacement } from "@/util/walls/walls";
import { startDoorPlacement, tryCreateDoor } from "@/util/door/doors";
import { useWindowToolState } from "@/state/tools/windowToolState";
import {
  convertWindowsInRange,
  startWindowConversionLine,
} from "@/util/windows/windows";
import { Vector2d } from "@/util/points/points";

interface PointProps {
  data: GridPoint;
  gridSize: number;
  pointSize: number;
  colourOverride: string;
}

const Point = ({ data, gridSize, pointSize, colourOverride }: PointProps) => {
  const [hover, setHover] = React.useState(false);

  const style = {
    backgroundColor: hover ? "white" : colourOverride,
    left: data.pos.x * gridSize - pointSize / 2 - (hover ? pointSize / 4 : 0),
    top: data.pos.y * gridSize - pointSize / 2 - (hover ? pointSize / 4 : 0),
    width: pointSize + (hover ? pointSize / 2 : 0),
    height: pointSize + (hover ? pointSize / 2 : 0),
    borderRadius: "50%",
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onMouseDown = (e: MouseEvent) => {
    const selectedTool = useToolState.getState().selectedTool;

    switch (selectedTool) {
      case "wall":
        if (useWallToolState.getState().lineStart === null) {
          startWallPlacement({
            pointCoord: data.pos,
            screenCoord: new Vector2d(e.clientX, e.clientY),
          });
        } else {
          if (!useWallToolState.getState().getIsValidLineEndPoint(data.pos))
            return;

          endWallPlacement({
            pointCoord: data.pos,
            screenCoord: new Vector2d(e.clientX, e.clientY),
          });

          // Reset the line start to new point
          startWallPlacement({
            pointCoord: data.pos,
            screenCoord: new Vector2d(e.clientX, e.clientY),
          });

          // TODO: if line end crosses a line, cancel new line making.
        }
        break;
      case "door":
        if (useDoorToolState.getState().lineStart === null) {
          startDoorPlacement({
            pointCoord: data.pos,
            screenCoord: new Vector2d(e.clientX, e.clientY),
          });
        } else {
          useDoorToolState.getState().setLineEndTarget(data.pos);
          tryCreateDoor();
        }
        break;
      case "window":
        if (useWindowToolState.getState().lineStart === null) {
          startWindowConversionLine({
            pointCoord: data.pos,
            screenCoord: new Vector2d(e.clientX, e.clientY),
          });
        } else {
          convertWindowsInRange(
            useWindowToolState.getState().lineStart?.pointCoord!,
            data.pos
          );
          useWindowToolState.getState().cancelLine();
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
