"use client";
import ToolBar from "@/components/tools";
import WallToolDrawer from "@/components/tools/tool/wallTool/wallToolDrawer";
import Version from "@/components/version";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/components/canvas"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="h-screen">
      <Canvas />
      <ToolBar />

      <WallToolDrawer />
      <Version />
    </div>
  );
}
