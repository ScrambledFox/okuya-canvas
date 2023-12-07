import { useEffect, useState } from "react";

import { useEditorState } from "@/state/editorState";
import { Door as DoorType } from "@/types/inter";
import { Line } from "@/util/line/lines";
import { Vector2d } from "@/util/points/points";
import { useToolState } from "@/state/tools/toolState";
import { useSelectToolState } from "@/state/tools/selectToolState";

interface DoorProps {
  data: DoorType;
  gridSize: number;
  pointSize: number;
  colourOverride: string;
}

const Door = ({ data }: { data: DoorType }) => {
  const tileSize = useEditorState((state) => state.tileSize);
  const [perpendicular, setPerpendicular] = useState<Line | null>(null);

  const selectedTool = useToolState((state) => state.selectedTool);
  const isHovered = useSelectToolState(
    (state) => state.hoveredObject === data.id
  );
  const isSelected = useSelectToolState(
    (state) => state.selectedObject === data.id
  );

  useEffect(() => {
    const line = new Line(data.start.x, data.start.y, data.end.x, data.end.y);
    setPerpendicular(line.rotated(-Math.PI / 2));
  }, [data]);

  const getDirectionOfArc = () => {
    if (perpendicular === null) return;
    return Vector2d.subtract(data.end, perpendicular?.endPoint);
  };

  const onMouseEnter = () => {
    useSelectToolState.getState().setHoveredObject(data.id);
  };

  const onMouseLeave = () => {
    useSelectToolState.getState().unsetHoveredObject();
  };

  const onMouseDown = () => {
    switch (selectedTool) {
      case "select":
      case "direct-select":
        useSelectToolState.getState().select(data.id);
        break;
      default:
        break;
    }
  };

  const style = {
    strokeWidth: isHovered || isSelected ? 4 : 2,
    cursor: isHovered ? "pointer" : "default",
  };

  return (
    perpendicular !== null && (
      <svg className="absolute z-20 overflow-visible" style={style}>
        <path
          d={`M ${data.start.x * tileSize},${data.start.y * tileSize} ${
            perpendicular?.endPoint.x! * tileSize
          },${perpendicular?.endPoint.y! * tileSize} a${
            perpendicular?.length! * tileSize
          },${perpendicular?.length! * tileSize} 0 0,1 ${
            getDirectionOfArc()?.x! * tileSize
          },${getDirectionOfArc()?.y! * tileSize} z`}
          stroke="#fff"
          strokeDasharray={12}
          fill="#ffffff11"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
        />
      </svg>
    )
  );
};

export default Door;
