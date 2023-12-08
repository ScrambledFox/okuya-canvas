import { Line } from "@/util/line/lines";
import { Rect } from "@svgdotjs/svg.js";

const WindowGraphics = ({
  style,
  data,
  tileSize,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
}: {
  style: any;
  data: any;
  tileSize: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
}) => {
  const line = new Line(data.start.x, data.start.y, data.end.x, data.end.y);

  const line1 = line.sideStep(-0.1);
  const line2 = line.sideStep(0.1);

  return (
    <svg
      className="absolute z-10 overflow-visible pointer-events-none select-none"
      style={style}
    >
      <line
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        className="pointer-events-auto select-all"
        style={style}
        x1={line1.x1 * tileSize}
        y1={line1.y1 * tileSize}
        x2={line1.x2 * tileSize}
        y2={line1.y2 * tileSize}
        stroke="#fff"
      />
      <line
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        className="pointer-events-auto select-all"
        style={style}
        x1={line2.x1 * tileSize}
        y1={line2.y1 * tileSize}
        x2={line2.x2 * tileSize}
        y2={line2.y2 * tileSize}
        stroke="#fff"
      />

      <polygon
        points={` ${line1.x1 * tileSize},${line1.y1 * tileSize} 
                  ${line1.x2 * tileSize},${line1.y2 * tileSize} 
                  ${line2.x2 * tileSize},${line2.y2 * tileSize} 
                  ${line2.x1 * tileSize},${line2.y1 * tileSize}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        className="pointer-events-auto select-all"
        style={style}
        fill="#ffffff11"
      />
    </svg>
  );
};

export default WindowGraphics;
