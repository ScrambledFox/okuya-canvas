import React, { useEffect, useState } from "react";
import { DragPoint } from "@/types/grid";
import {
  getManhattanLine,
  gridToMeter,
  pixelsToGrid,
} from "@/util/coords/coords";
import { Line } from "@/util/line/lines";
import { Vector2d } from "@/util/points/points";

interface DragLineProps {
  start: DragPoint;
  renderArc?: boolean;
  minLength?: number;
  maxLength?: number;

  onMousePosChanged?: (pos: Vector2d) => void;
  onScreenLineUpdated?: (line: Line) => void;
}

const DragLine = ({
  start,
  renderArc = false,
  minLength = 0,
  maxLength = Number.MAX_VALUE,
  onMousePosChanged,
  onScreenLineUpdated,
}: DragLineProps) => {
  const [mousePos, setMousePos] = useState<Vector2d | null>(null);

  const [screenLine, setScreenLine] = useState<Line | null>(null);

  useEffect(() => {
    const onMouseMove = (e: any) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [start]);

  useEffect(() => {
    if (start === null || mousePos === null) return;

    setScreenLine(
      getManhattanLine(start.screenCoord, mousePos, minLength, maxLength)
    );
  }, [start, mousePos, minLength, maxLength]);

  useEffect(() => {
    if (onMousePosChanged !== undefined && mousePos !== null)
      onMousePosChanged(mousePos);
  }, [mousePos, onMousePosChanged]);

  useEffect(() => {
    if (onScreenLineUpdated !== undefined && screenLine !== null)
      onScreenLineUpdated(screenLine);
  }, [screenLine, onScreenLineUpdated]);
  0;
  return (
    <>
      {start != null && screenLine != null && (
        <>
          <svg width="100%" height="100%">
            {/* Render the ghost line while dragging */}
            <line
              x1={start.screenCoord.x}
              y1={start.screenCoord.y}
              x2={screenLine.endPoint.x}
              y2={screenLine.endPoint.y}
              stroke="#aaa"
              strokeWidth="2"
            />
            {/* Render 1/4th of circle as arc to represent door swinging */}
            {renderArc && (
              <DoorVisual
                start={screenLine.startPoint}
                end={screenLine.endPoint}
              />
            )}
          </svg>
          <h2
            style={{
              position: "absolute",
              left: screenLine?.midpoint.x,
              top: screenLine?.midpoint.y,
              // transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              textShadow: "0px 0px 4px black",
              zIndex: 100,
            }}
          >
            {(screenLine.length * pixelsToGrid * gridToMeter)
              .toFixed(2)
              .toString()}
            m
          </h2>
        </>
      )}
    </>
  );
};

const DoorVisual = ({ start, end }: { start: Vector2d; end: Vector2d }) => {
  const [line, setLine] = useState<Line | null>(null);
  const [perpendicular, setPerpendicular] = useState<Line | null>(null);

  useEffect(() => {
    setLine(new Line(start.x, start.y, end.x, end.y));
  }, [start, end]);

  useEffect(() => {
    if (line === null) return;
    setPerpendicular(line.rotated(-Math.PI / 2));
  }, [line]);

  const getDirectionOfArc = () => {
    if (line === null || perpendicular === null) return;
    return Vector2d.subtract(line?.endPoint, perpendicular?.endPoint);
  };

  return (
    line !== null &&
    perpendicular !== null && (
      <>
        {/* Render arc */}
        <path
          d={`M ${line?.startPoint.x},${line?.startPoint.y} ${
            perpendicular?.endPoint.x
          },${perpendicular?.endPoint.y} a${line?.length},${
            line?.length
          } 0 0,1 ${getDirectionOfArc()?.x},${getDirectionOfArc()?.y}`}
          stroke="#aaa"
          strokeWidth="2"
          fill="transparent"
        />
      </>
    )
  );
};

export default DragLine;
