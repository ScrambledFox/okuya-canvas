"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import FilterDock from "@/components/filters";
import ToolBar from "@/components/tools";
import DoorToolDrawer from "@/components/tools/tool/doorTool/doorToolDrawer";
import SelectTool from "@/components/tools/tool/selectTool";
import WallToolDrawer from "@/components/tools/tool/wallTool/wallToolDrawer";
import Version from "@/components/version";
import WindowToolDrawer from "@/components/tools/tool/windowTool/windowToolDrawer";
import FurniturePanel from "@/components/furniture";
import StatsPanel from "@/components/stats";
import ExplainabilityPanel from "@/components/explain";
import { useSelectToolState } from "@/state/tools/selectToolState";
import { useEditorState } from "@/state/editorState";
import SocketHandler from "@/components/dash/socket";
import SendChangePanel from "@/components/dash/changePanel";
import AIPanel from "@/components/ai";

const Canvas = dynamic(() => import("@/components/canvas"), {
  ssr: false,
});

export default function Page() {
  const selectedObject = useSelectToolState((state) => state.selectedObject);
  const selectedObjectIsFurniture =
    selectedObject == null
      ? false
      : useEditorState.getState().idDictionary[selectedObject].type ===
        "furniture";

  useEffect(() => {
    const onKeyUp = (e: any) => {};

    window.addEventListener("keydown", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  }, []);

  const onMouseDown = (e: any) => {
    // HANDLED IN POINT CLASS NOW
    //
    // if (selectedTool === "door") {
    //   // Check if placing door
    //   if (useDoorToolState.getState().lineStart === null) return;
    //   tryCreateDoor();
    // }
  };

  return (
    <div className="h-screen" onMouseDown={onMouseDown}>
      <div id="center">
        <Canvas />
        <StatsPanel />
      </div>

      <div id="panels">
        <ToolBar />
        <FurniturePanel />
        <FilterDock />
        {/* <SaveLoadPanel /> */}
        {selectedObjectIsFurniture && <ExplainabilityPanel />}
      </div>

      <div id="tools">
        <SelectTool />
        <WallToolDrawer />
        <DoorToolDrawer />
        <WindowToolDrawer />
        <AIPanel />
      </div>

      <div id="connections">
        <SocketHandler />
        <SendChangePanel />
      </div>

      <Version />
    </div>
  );
}
