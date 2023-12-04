import React, { useEffect, useState } from "react";

import { Tile } from "@/types/tiles";
import { v4 as uuidv4 } from "uuid";

import GridTile from "../tile";

interface GridProps {
  width: number;
  height: number;
  size: number;
}

const Grid = ({ width, height, size }: GridProps) => {
  const [grid, setGrid] = useState<Tile[][]>([]);

  useEffect(() => {
    setGrid(
      Array.from({ length: height }, (v, y) =>
        Array.from({ length: width }, (b, x) => {
          return {
            x: x,
            y: y,
            id: uuidv4(),
            color: "black",
          } as Tile;
        })
      )
    );
  }, [width, height]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-center">
      <div className=" self-center items-center">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-row">
            {row.map((tile, tileIndex) => (
              <GridTile key={tileIndex} size={size} tileInfo={tile} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
