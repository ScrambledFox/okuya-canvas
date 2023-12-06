"use client";
import FilterDock from "@/components/filters";
import ToolBar from "@/components/tools";
import WallToolDrawer from "@/components/tools/tool/wallTool/wallToolDrawer";
import Version from "@/components/version";
import { useWallToolState } from "@/state/editor/tools/wallToolState";
import dynamic from "next/dynamic";
import { useEffect } from "react";

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

  return (
    <div className="h-screen">
      <Canvas />

      <ToolBar />
      <FilterDock />

      <WallToolDrawer />
      <Version />
    </div>
  );
}
