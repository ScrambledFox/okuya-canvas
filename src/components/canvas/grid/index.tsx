import React, { useEffect, useState } from "react";

import { GridPoint, GridTile } from "@/types/tiles";
import { v4 as uuidv4 } from "uuid";

import Tile from "../tile";
import Point from "../point";

interface GridProps {
  width: number;
  height: number;
  size: number;
}

const Grid = ({ width, height, size }: GridProps) => {
  const [tiles, setTiles] = useState<GridTile[][]>([]);
  const [points, setPoints] = useState<GridPoint[][]>([]);

  useEffect(() => {
    setTiles(
      Array.from({ length: height }, (v, y) =>
        Array.from({ length: width }, (b, x) => {
          return {
            pos: { x: x, y: y },
            id: uuidv4(),
            color: "black",
          } as GridTile;
        })
      )
    );

    setPoints(
      Array.from({ length: height + 1 }, (v, y) =>
        Array.from({ length: width + 1 }, (b, x) => {
          return {
            pos: { x: x, y: y },
            id: uuidv4(),
          } as GridPoint;
        })
      )
    );
  }, [width, height]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-center">
      <div className="self-center items-center fixed">
        {/* Render Tiles */}
        <div id="tiles">
          {tiles.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row">
              {row.map((tile, tileIndex) => (
                <Tile key={tileIndex} size={size} data={tile} />
              ))}
            </div>
          ))}
        </div>

        {/* Render Points */}
        <div id="points" className="absolute left-0 top-0">
          {points.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row">
              {row.map((point, pointIndex) => (
                <Point
                  key={pointIndex}
                  gridSize={size}
                  pointSize={10}
                  data={point}
                  color={`hsl(${(point.pos.x * point.pos.y) % 360}, 100%, 50%)`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
