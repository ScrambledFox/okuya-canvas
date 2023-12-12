import React, { Suspense, useEffect } from "react";

import { useToolState } from "@/state/tools/toolState";
import { GridPoint, GridTile } from "@/types/tiles";
import { v4 as uuidv4 } from "uuid";

import Tile from "../tile";
import Point from "../point";
import Wall from "../house/wall";
import { useEditorState } from "@/state/editorState";
import LoadingElement from "@/components/loading";
import Door from "../house/door";
import FurnitureRenderer from "../furniture";

interface GridProps {
  width: number;
  height: number;
  size: number;
}

const Grid = ({ width, height, size }: GridProps) => {
  const selectedTool = useToolState((state) => state.selectedTool);

  const [tiles, setTiles] = useEditorState((state) => [
    state.tiles,
    state.setTiles,
  ]);
  const [points, setPoints] = useEditorState((state) => [
    state.points,
    state.setPoints,
  ]);
  const walls = useEditorState((state) => state.walls);

  const wallPoints = useEditorState((state) => state.wallPoints);

  const doors = useEditorState((state) => state.doors);

  useEffect(() => {
    setTiles(
      Array.from({ length: height }, (i, y) =>
        Array.from({ length: width }, (j, x) => {
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
            col: "#444",
          } as GridPoint;
        })
      )
    );
  }, [width, height, setTiles, setPoints]);

  return (
    <div className="fixed flex flex-col h-screen w-screen justify-center items-center text-center">
      <div id="grid" className="self-center items-center fixed">
        <Suspense fallback={<LoadingElement />}>
          {/* Render Tiles */}

          {tiles.length === 0 && <LoadingElement />}
          {tiles.length !== 0 && points.length !== 0 && (
            <>
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

              {/* Render points */}
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
                          colourOverride="#444"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* Render wallPoints for door/window tool */}
              {(selectedTool === "door" || selectedTool === "window") && (
                <div id="points" className="absolute left-0 top-0">
                  {wallPoints.map((point, i) => (
                    <Point
                      key={i}
                      gridSize={size}
                      pointSize={10}
                      data={point}
                      colourOverride="#444"
                    />
                  ))}
                </div>
              )}

              {/* Render walls */}
              <div id="walls" className="absolute left-0 top-0">
                {walls.map((wall) => (
                  <Wall key={wall.id} data={wall} />
                ))}
              </div>

              {/* Render doors */}
              <div id="doors" className="absolute left-0 top-0">
                {doors.map((door) => (
                  <Door key={door.id} data={door} />
                ))}
              </div>

              {/* Render Furniture */}
              <div id="furniture" className="absolute left-0 top-0">
                <FurnitureRenderer />
              </div>
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Grid;
