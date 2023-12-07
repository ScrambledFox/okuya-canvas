"use client";

import FilterDock from "@/components/filters";
import ToolBar from "@/components/tools";
import DoorToolDrawer from "@/components/tools/tool/doorTool/doorToolDrawer";
import SelectTool from "@/components/tools/tool/selectTool";
import WallToolDrawer from "@/components/tools/tool/wallTool/wallToolDrawer";
import Version from "@/components/version";
import { useToolState } from "@/state/tools/toolState";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Canvas = dynamic(() => import("@/components/canvas"), {
  ssr: false,
});

export default function Page() {
  const selectedTool = useToolState((state) => state.selectedTool);

  useEffect(() => {
    const onKeyUp = (e: any) => {};

    window.addEventListener("keydown", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  }, []);

  const onMouseDown = (e: any) => {
    // HANDLED IN POINT NOW
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

      <ToolBar />
      <FilterDock />

      <SelectTool />
      <WallToolDrawer />
      <DoorToolDrawer />

      <Version />
    </div>
  );
}
