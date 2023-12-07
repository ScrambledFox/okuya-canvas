import { useSelectToolState } from "@/state/tools/selectToolState";
import React, { useEffect } from "react";

const SelectTool = () => {
  useEffect(() => {
    const onKeyUp = (e: any) => {
      console.log(e.key);
      if (e.key === "Delete") {
        console.log("delete");
        useSelectToolState.getState().deleteSelectedObject();
      }
    };

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <div className="absolute left-0 top-0 h-screen w-screen pointer-events-none select-none"></div>
  );
};

export default SelectTool;
