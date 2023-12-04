import React, { useEffect } from "react";
import { GridPoint } from "@/types/tiles";

interface PointProps {
  data: GridPoint;
  gridSize: number;
  pointSize: number;
  color: string;
}

const Point = ({ data, gridSize, pointSize, color }: PointProps) => {
  const [hover, setHover] = React.useState(false);

  const style = {
    backgroundColor: hover ? "white" : color,
    left: data.pos.x * gridSize - pointSize / 2 - (hover ? pointSize / 4 : 0),
    top: data.pos.y * gridSize - pointSize / 2 - (hover ? pointSize / 4 : 0),
    width: pointSize + (hover ? pointSize / 2 : 0),
    height: pointSize + (hover ? pointSize / 2 : 0),
    borderRadius: "50%",
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute z-10"
    >
      {hover && (
        <div className="absolute w-32 z-50 pointer-events-none">
          {"x: " + data.pos.x + " y: " + data.pos.y}
        </div>
      )}
    </div>
  );
};

export default Point;
