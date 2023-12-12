import React, { Children, ElementType, ReactElement } from "react";
import Container from "../ui/container";
import FurnitureIcon from "./furnitureIcon";

import { IoIosBed } from "react-icons/io";
import { FaCouch } from "react-icons/fa";

const FurniturePanel = () => {
  return (
    <Container className="left-28 w-64 max-h-72 overflow-y-auto">
      <div className="justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">Furniture</h1>
      </div>
      <FurnitureGrid>
        <FurnitureIcon name="Double Bed" type="double-bed" icon={IoIosBed} />
        <FurnitureIcon name="Couch w/ CL" type="cl-couch" icon={FaCouch} />
      </FurnitureGrid>
    </Container>
  );
};

const FurnitureGrid = ({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}) => {
  const arrayChildren = Children.toArray(children);

  return (
    <div className="flex flex-wrap items-center justify-center ">
      {arrayChildren.map((item, i) => {
        return (
          <div className="w-1/3" key={i}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default FurniturePanel;
