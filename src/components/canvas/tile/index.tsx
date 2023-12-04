import { GridTile } from "@/types/tiles";
import React from "react";

interface TileProps {
  data: GridTile;
  size: number;
}

const Tile = ({ data, size }: TileProps) => {
  const [hover, setHover] = React.useState(false);

  const style = {
    width: size,
    height: size,
    backgroundColor: hover ? "red" : data.color,

    borderLeft: "1px solid purple",
    borderTop: "1px solid purple",
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
      className="overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {hover && (
        <div className="absolute w-32 z-50 pointer-events-none">
          {"x: " + data.pos.x + " y: " + data.pos.y}
        </div>
      )}
    </div>
  );
};

export default Tile;
