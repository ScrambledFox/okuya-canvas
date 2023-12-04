import { Tile } from "@/types/tiles";
import React from "react";

interface TileProps {
  tileInfo: Tile;
  size: number;
}

const Tile = ({ tileInfo, size }: TileProps) => {
  const [hover, setHover] = React.useState(false);

  const style = {
    width: size,
    height: size,
    backgroundColor: hover ? "red" : tileInfo.color,

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
        <div className="absolute z-10 pointer-events-none">
          {"x: " + tileInfo.x + " y: " + tileInfo.y}
        </div>
      )}
    </div>
  );
};

export default Tile;
