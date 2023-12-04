import React, { useEffect, useState } from "react";

import { useToolState } from "@/state/editor/tools/toolState";
import { GridPoint, GridTile } from "@/types/tiles";
import { v4 as uuidv4 } from "uuid";

import Tile from "../tile";
import Point from "../point";
import Wall from "../house/wall";
import { useEditorState } from "@/state/editor/editorState";

interface GridProps {
  width: number;
  height: number;
  size: number;
}

const Grid = ({ width, height, size }: GridProps) => {
  const [tiles, setTiles] = useState<GridTile[][]>([]);
  const [points, setPoints] = useState<GridPoint[][]>([]);

  const selectedTool = useToolState((state) => state.selectedTool);

  const walls = useEditorState((state) => state.walls);

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
                <Tile
                  key={tileIndex}
                  size={size}
                  data={tile}
                  renderBottom={rowIndex === height - 1}
                  renderRight={tileIndex === width - 1}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Render Points */}
        {selectedTool === "wall" && (
          <div id="points" className="absolute left-0 top-0">
            {points.map((row, rowIndex) => (
              <div key={rowIndex} className="flex flex-row">
                {row.map((point, pointIndex) => (
                  <Point
                    key={pointIndex}
                    gridSize={size}
                    pointSize={10}
                    data={point}
                    // color={`hsl(${
                    //   (point.pos.x * point.pos.y) % 360
                    // }, 100%, 50%)`}
                    color="#444"
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Render walls */}
        <div id="walls" className="absolute left-0 top-0">
          {walls.map((wall) => (
            <Wall key={wall.id} data={wall} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
