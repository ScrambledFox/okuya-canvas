import React from "react";

import LineTool from "../lineTool/lineTool";
import { useDoorToolState } from "@/state/tools/doorToolState";
import { gridToPixels } from "@/util/coords/coords";
import { Line } from "@/util/line/lines";

const DoorToolDrawer = () => {
  const start = useDoorToolState((state) => state.lineStart);

  const doorTileWidth = useDoorToolState((state) => state.doorTileWidth);

  const onScreenLineUpdated = (line: Line) => {
    useDoorToolState.getState().setLineEndTarget(line.endPoint);
  };

  const onCancelLine = () => {
    useDoorToolState.getState().cancelLine();
  };

  return (
    <LineTool
      start={start}
      onCancel={onCancelLine}
      renderArc={true}
      minLength={doorTileWidth * gridToPixels}
      maxLength={doorTileWidth * gridToPixels}
      onScreenLineUpdated={onScreenLineUpdated}
    />
  );
};

export default DoorToolDrawer;
