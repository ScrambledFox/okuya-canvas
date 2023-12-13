import { useFurnitureState } from "@/state/furnitureState";
import React, { useEffect, useState } from "react";

const StatsPanel = () => {
  const usedBudget = useFurnitureState((state) => state.usedBudget);
  const score = useFurnitureState((state) => state.score);

  return (
    <div className=" absolute w-screen h-24 top-2 flex flex-col justify-center items-center">
      <h1 className="text-xl">Used Budget: €{usedBudget}</h1>
      <h1 className="text-xl">Total Score: {score}</h1>
    </div>
  );
};

export default StatsPanel;
