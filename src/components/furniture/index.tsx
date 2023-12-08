import React from "react";
import Container from "../ui/container";
import FurnitureIcon from "./furnitureIcon";

import { FaCouch } from "react-icons/fa";

const FurniturePanel = () => {
  return (
    <Container className="left-24 w-64 max-h-72 overflow-y-auto">
      <div className="justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">Furniture</h1>
      </div>
      <FurnitureGrid>
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
        <FurnitureIcon name="Bed" icon={FaCouch} />
      </FurnitureGrid>
    </Container>
  );
};

const FurnitureGrid = ({ children }: { children: React.JSX.Element[] }) => {
  return (
    <div className="flex flex-wrap">
      {children.map((item, i) => {
        return (
          <div key={i} className="flex-item w-1/4">
            <FurnitureIcon name="Bed" icon={FaCouch} />
          </div>
        );
      })}
    </div>
  );
};

export default FurniturePanel;
