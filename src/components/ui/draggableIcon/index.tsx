import { Vector2d } from "@/util/points/points";
import { ElementType, useState } from "react";

interface DraggableIconProps {
  icon: ElementType;
  name: string;
}

const DraggableIcon = (props: DraggableIconProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(new Vector2d(0, 0));
  const [position, setPosition] = useState(new Vector2d(0, 0));

  const style = {
    color: "gray",
    cursor: isDragging ? "grabbing" : "grab",

    left: `${position.x}px`,
    top: `${position.y}px`,
  };

  const onMouseDown = (e: any) => {
    setIsDragging(true);

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setOffset(new Vector2d(x, y));

    document.body.style.userSelect = "none";
  };

  const onMouseMove = (e: any) => {
    if (!isDragging) return;

    const x = e.clientX - offset.x;
    const y = e.clientY - offset.y;
    setPosition(new Vector2d(x, y));
  };

  const onMouseUp = (e: any) => {
    if (!isDragging) return;

    setIsDragging(false);
    document.body.style.userSelect = "auto";
  };

  return (
    <div
      style={style}
      className=" absolute max-h-16 aspect-square flex flex-col text-center justify-center items-center p-2 hover:bg-white hover:bg-opacity-10 rounded-lg cursor-grab select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <props.icon size={25} />
      <div className="text-sm mt-2">{props.name}</div>
    </div>
  );
};

export default DraggableIcon;
