import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import Konva from "konva";
import { Stage, Layer, Circle, Rect, Transformer } from "react-konva";
import { get } from "http";

import Grid from "./grid";

// Remove the import statement for React since it is already imported in the file above
// import React from "react";

const CustomComponent = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}: {
  shapeProps: {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    id: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}) => {
  const shapeRef = React.useRef<any>();
  const trRef = React.useRef<any>();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox: any, newBox: any) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    type: "wall",
    id: uuidv4(),
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    type: "wall",
    id: uuidv4(),
  },
];

function Canvas(props: any) {
  const [rectangles, setRectangles] = useState<any>(initialRectangles);
  const [selectedId, selectShape] = useState<any>(null);

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }

    console.log(rectangles);
  };

  return (
    // <Stage
    //   width={window.innerWidth}
    //   height={window.innerHeight}
    //   className={"canvas"}
    //   role={"img"}
    //   style={{ position: "absolute", top: 0, left: 0 }}
    //   tabIndex={0}
    //   title={"Canvas"}
    //   onClick={checkDeselect}
    //   onTouchStart={checkDeselect}
    // >
    //   <Layer>
    //     {rectangles.map((rect: any, i: number) => {
    //       return (
    //         <CustomComponent
    //           key={i}
    //           shapeProps={rect}
    //           isSelected={rect.id === selectedId}
    //           onSelect={() => {
    //             selectShape(rect.id);
    //           }}
    //           onChange={(newAttrs: any) => {
    //             const rects = rectangles.slice();
    //             rects[i] = newAttrs;
    //             setRectangles(rects);
    //           }}
    //         />
    //       );
    //     })}
    //   </Layer>
    // </Stage>
    <Grid height={30} width={30} size={25} />
  );
}

export default Canvas;
