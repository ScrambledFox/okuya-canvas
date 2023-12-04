import React, { useEffect, useState } from "react";

import Grid from "./grid";
import { useEditorState } from "@/state/editor/editorState";

function Canvas(props: any) {
  const gridSize = useEditorState((state) => state.gridSize);
  const tileSize = useEditorState((state) => state.tileSize);

  return <Grid height={gridSize.x} width={gridSize.y} size={tileSize} />;
}

export default Canvas;
