import React, { useEffect } from "react";
import DragLine from "@/components/canvas/dragLine";
import { DragPoint } from "@/types/grid";
import { Line } from "@/util/line/lines";
import { Vector2d } from "@/util/points/points";

interface LineToolProps {
  start: DragPoint | null;
  onCancel: () => void;

  renderArc?: boolean;

  minLength?: number;
  maxLength?: number;

  onMousePosChanged?: (pos: Vector2d) => void;
  onScreenLineUpdated?: (line: Line) => void;
}

const LineTool = ({
  start,
  onCancel,
  renderArc = false,
  minLength = 0,
  maxLength = Number.MAX_VALUE,
  onMousePosChanged,
  onScreenLineUpdated,
}: LineToolProps) => {
  useEffect(() => {
    const onKeyUp = (e: any) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    window.addEventListener("keydown", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyUp);
    };
  }, [onCancel]);

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-100 pointer-events-none select-none"
      id="draw-line"
    >
      {start !== null && (
        <DragLine
          start={start}
          renderArc={renderArc}
          minLength={minLength}
          maxLength={maxLength}
          onMousePosChanged={onMousePosChanged}
          onScreenLineUpdated={onScreenLineUpdated}
        />
      )}
    </div>
  );
};

export default LineTool;
