import Container from "@/components/ui/container";
import { useNetworkState } from "@/state/network/networkState";
import React from "react";

const SendChangePanel = () => {
  const isDirty = useNetworkState((state) => state.canvasIsDirty);

  return (
    <Container className={"bottom-10 right-0"}>
      <div className="justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">Send Changes</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center">
          <div
            className={`w-4 h-4 rounded-full ${
              isDirty ? "bg-red-500" : "bg-green-500"
            }`}
          ></div>
          <p className="ml-2">{isDirty ? "Dirty" : "Clean"}</p>
        </div>
      </div>

      <div>
        <button
          className="w-full bg-slate-900  text-neutral-100 font-semibold p-2 rounded-lg mt-2"
          onClick={() => {
            useNetworkState.getState().emit("send-changes");
          }}
        >
          Send Changes
        </button>
      </div>
    </Container>
  );
};

export default SendChangePanel;
