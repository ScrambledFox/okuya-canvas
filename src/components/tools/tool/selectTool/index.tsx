import { useSelectToolState } from "@/state/editor/tools/selectToolState";
import React from "react";

const SelectTool = () => {
  const onKeyUp = (e: any) => {
    console.log(e.key);
    if (e.key === "Delete") {
      useSelectToolState.getState().deleteSelectedObject();
    }
  };

  return (
    <div className="absolute left-0 top-0 h-screen w-screen pointer-events-none select-none"></div>
  );
};

export default SelectTool;
