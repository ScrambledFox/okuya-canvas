"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

import FilterDock from "@/components/filters";
import { SaveLoadPanel } from "@/components/fs/layout";
import ToolBar from "@/components/tools";
import DoorToolDrawer from "@/components/tools/tool/doorTool/doorToolDrawer";
import SelectTool from "@/components/tools/tool/selectTool";
import WallToolDrawer from "@/components/tools/tool/wallTool/wallToolDrawer";
import Version from "@/components/version";
import { useToolState } from "@/state/tools/toolState";
import WindowToolDrawer from "@/components/tools/tool/windowTool/windowToolDrawer";
import FurniturePanel from "@/components/furniture";

const Canvas = dynamic(() => import("@/components/canvas"), {
  ssr: false,
});

export default function Page() {
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
      <Canvas />

      <div id="panels">
        <ToolBar />
        <FurniturePanel />
        <FilterDock />
        <SaveLoadPanel />
      </div>

      <div id="tools">
        <SelectTool />
        <WallToolDrawer />
        <DoorToolDrawer />
        <WindowToolDrawer />
      </div>

      <Version />
    </div>
  );
}
