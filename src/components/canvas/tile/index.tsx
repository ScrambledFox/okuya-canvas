import { useEditorState } from "@/state/editorState";
import { useFilterState } from "@/state/filters/filterState";
import { useSelectToolState } from "@/state/tools/selectToolState";
import { useToolState } from "@/state/tools/toolState";
import { FilterFlags } from "@/types/filters";
import { GridTile, TileFlags } from "@/types/tiles";
import { doFloodFill } from "@/util/tiles/floodfill";
import Color from "color";
import React, { useEffect } from "react";

interface TileProps {
  data: GridTile;
  renderBottom: boolean;
  renderRight: boolean;
  size: number;
}

const Tile = ({ data, size, renderRight, renderBottom }: TileProps) => {
  const [hover, setHover] = React.useState(false);

  const [hoverColour, setHoverColour] = React.useState("#222");

  const [tileColour, setTileColour] = React.useState("#000");

  const tiles = useEditorState((state) => state.tiles);
  const filter = useFilterState((state) => state.filter);

  useEffect(() => {
    if (hover) {
      setTileColour(hoverColour);
      return;
    }

    let colour = Color("#000");
    const filter = useFilterState.getState().filter;

    if (filter & FilterFlags.Wall && data.flags & TileFlags.Wall)
      colour = colour.mix(Color("#fff"), 0.25);

    if (filter & FilterFlags.Window && data.flags & TileFlags.Window)
      colour = colour.mix(Color("#f0f"), 0.25);

    if (
      filter & FilterFlags.RuleAffected &&
      data.flags & TileFlags.RuleAffected
    )
      colour = colour.mix(Color("#0ff"), 0.25);

    if (
      filter & FilterFlags.FurnitureInfluence &&
      data.flags & TileFlags.FurnitureInfluence
    )
      colour = colour.mix(Color("#f00"), 0.25);

    setTileColour(colour.string());
  });

  const style = {
    width: size,
    height: size,
    backgroundColor: tileColour,

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
