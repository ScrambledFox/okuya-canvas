import React from "react";

interface TipPanelProps {
  tip: string;
}

const TipPanel = (props: TipPanelProps) => {
  return (
    <div>
      <h1 className="text-xl">Tip: {props.tip}</h1>
    </div>
  );
};

export default TipPanel;
