import React from "react";
import Container from "../ui/container";
import Button from "../ui/button";

const SaveLoadPanel = () => {
  const onSave = () => {
    console.log("save");
  };

  const onLoad = () => {
    console.log("load");
  };

  return (
    <Container className="bottom-0 left-0">
      <div className="justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">
          Save/Load Layouts
        </h1>
      </div>

      <div className="flex flex-row gap-2 justify-center text-center">
        <Button className="w-1/2" onClick={onSave}>
          Save
        </Button>
        <Button className="w-1/2" onClick={onLoad}>
          Load
        </Button>
      </div>
    </Container>
  );
};

export { SaveLoadPanel };
