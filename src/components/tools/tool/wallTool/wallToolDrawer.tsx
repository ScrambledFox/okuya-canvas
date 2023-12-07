import React from "react";

import LineTool from "../lineTool/lineTool";
import { useWallToolState } from "@/state/tools/wallToolState";

const WallToolDrawer = () => {
  const start = useWallToolState((state) => state.lineStart);

  const onCancelLine = () => {
    useWallToolState.getState().cancelLine();
  };

  return <LineTool start={start} onCancel={onCancelLine} />;
};

export default WallToolDrawer;
