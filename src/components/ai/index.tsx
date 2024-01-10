import React from "react";
import Container from "../ui/container";

const AIPanel = () => {
  return (
    <div className=" flex flex-row justify-center items-center">
      <Container className="bottom-0">
        <div className="justify-center text-center">
          <h1 className="text-neutral-100 text-lg font-semibold">OKUYA AI</h1>
        </div>

        <div className="flex flex-col items-center">
          <div>
            <button
              className="w-full bg-green-900  text-neutral-100 font-semibold p-2 rounded-lg mt-2"
              onClick={() => {
                console.log("Make AI Move");
              }}
            >
              Make AI Move
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AIPanel;
