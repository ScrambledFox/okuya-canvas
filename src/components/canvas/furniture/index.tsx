import { useEffect, useState } from "react";
import { useEditorState } from "@/state/editorState";
import { useFurnitureState } from "@/state/furnitureState";
import { Furniture, FurnitureType } from "@/types/furniture";
import { useToolState } from "@/state/tools/toolState";
import { useSelectToolState } from "@/state/tools/selectToolState";
import { calculateScore } from "@/util/furniture/score";
import { getFurnitureRecipe } from "@/util/furniture/recipes";

interface FurnitureRendererProps {}

const FurnitureRenderer = (props: FurnitureRendererProps) => {
  const furniture = useFurnitureState((state) => state.furniture);

  return (
    <div>
      {furniture.map((f, i) => (
        <FurniturePiece
          key={i}
          name={f.name}
          type="furniture"
          furnitureType={f.furnitureType}
          id={f.id}
          position={f.position}
          rotation={f.rotation}
        />
      ))}
    </div>
  );
};

const FurniturePiece = ({
  name,
  furnitureType: type,
  id,
  position,
  rotation,
}: Furniture) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const selected = useSelectToolState((state) => state.selectedObject === id);

  const recipe = getFurnitureRecipe(type);

  const tileSize = useEditorState((state) => state.tileSize);

  const moveFurniture = useFurnitureState((state) => state.moveFurniture);
  const rotateFurniture = useFurnitureState((state) => state.rotateFurniture);

  const [score, setScore] = useState<Number>(0);

  useEffect(() => {
    const onKeyDown = (e: any) => {
      if (!selected) return;

      if (e.key === "ArrowUp") {
        moveFurniture(id, { x: 0, y: -1 });
      } else if (e.key === "ArrowDown") {
        moveFurniture(id, { x: 0, y: 1 });
      } else if (e.key === "ArrowLeft") {
        moveFurniture(id, { x: -1, y: 0 });
      } else if (e.key === "ArrowRight") {
        moveFurniture(id, { x: 1, y: 0 });
      }

      if (e.key.toLowerCase() === "r") {
        rotateFurniture(id, (rotation + 1) % 4);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [id, moveFurniture, rotateFurniture, selected, rotation]);

  useEffect(() => {
    setScore(
      calculateScore({
        id,
        name,
        type: "furniture",
        furnitureType: type,
        position,
        rotation,
      })
    );
  }, [id, name, type, position, rotation]);

  const onMouseDown = (e: any) => {
    // setIsDragging(true);
    // const rect = e.target.getBoundingClientRect();
    // const gridRect = document.getElementById("grid")?.getBoundingClientRect();
    // const gridOffsetX = gridRect?.left || 0;
    // const gridOffsetY = gridRect?.top || 0;
    // const offsetX = e.clientX - rect.left - gridOffsetX;
    // const offsetY = e.clientY - rect.top - gridOffsetY;
    // console.log(gridOffsetX, gridOffsetY);
    // setOffset({
    //   x: offsetX,
    //   y: offsetY,
    // });
    // document.body.style.userSelect = "none";
  };

  const onMouseMove = (e: any) => {
    // if (!isDragging) return;
    // const gridRect = document.getElementById("grid")?.getBoundingClientRect();
    // const gridOffsetX = gridRect?.left || 0;
    // const gridOffsetY = gridRect?.top || 0;
    // console.log(gridOffsetX, gridOffsetY);
    // setDragPosition({
    //   x: e.clientX - offset.x - gridOffsetX,
    //   y: e.clientY - offset.y - gridOffsetY,
    // });
    // console.log("newpos", dragPosition);
  };

  const onMouseUp = (e: any) => {
    if (useToolState.getState().selectedTool === "select") {
      useSelectToolState.getState().select(id);
    }

    // if (!isDragging) return;

    // setIsDragging(false);
    // document.body.style.userSelect = "auto";
  };

  const style = {
    width: recipe.width * tileSize,
    height: recipe.height * tileSize,

    left: position.x * tileSize,
    top: position.y * tileSize,

    transformOrigin: "top left",
    transform: `rotate(${rotation * 90}deg)`,

    border: selected ? "1px solid #f00" : "none",

    // cursor: isDragging ? "grabbing" : "grab",
    cursor: "pointer",
  };

  return (
    <div
      style={style}
      className="absolute select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <img className="select-none" src={recipe.svgPath} />
      <div className="absolute bottom-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
        <p>{score.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default FurnitureRenderer;