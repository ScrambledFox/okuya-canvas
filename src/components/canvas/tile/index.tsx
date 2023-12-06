import { useSelectToolState } from "@/state/editor/tools/selectToolState";
import { useToolState } from "@/state/editor/tools/toolState";
import { GridTile, TileFlags } from "@/types/tiles";
import { doFloodFill } from "@/util/tile/floodfill";
import React from "react";

interface TileProps {
  data: GridTile;
  renderBottom: boolean;
  renderRight: boolean;
  size: number;
}

const Tile = ({ data, size, renderRight, renderBottom }: TileProps) => {
  const [hover, setHover] = React.useState(false);

  const [hoverColour, setHoverColour] = React.useState("#222");

  const getTileColour = () => {
    if (hover) {
      return hoverColour;
    }

    if (data.flags & TileFlags.Wall) {
      return "#f00";
    }

    if (data.flags & TileFlags.Flooded) {
      return "#f0f";
    }

    return "#000";
  };

  const style = {
    width: size,
    height: size,
    backgroundColor: getTileColour(),

    borderLeft: "1px solid gray",
    borderTop: "1px solid gray",

    borderRight: renderRight ? "1px solid gray" : "",
    borderBottom: renderBottom ? "1px solid gray" : "",
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onMouseDown = () => {
    const selectedTool = useToolState.getState().selectedTool;

    switch (selectedTool) {
      case "select":
      case "direct-select":
        if (useSelectToolState.getState().getHasSelected()) {
          useSelectToolState.getState().deselect();
        }
        break;
      case "dev-floodfill":
        doFloodFill(data);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={style}
      className="overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
    >
      {hover && (
        <div className="absolute w-32 z-10 pointer-events-none select-none">
          {"x: " + data.pos.x + " y: " + data.pos.y}
          {/* List flags */}
          <ul className="list-disc">
            {Object.keys(TileFlags).map((key) => {
              if (data.flags & TileFlags[key as keyof typeof TileFlags]) {
                return <p key={key}>{key}</p>;
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tile;
