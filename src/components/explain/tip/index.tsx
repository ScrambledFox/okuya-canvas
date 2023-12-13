import { Tip } from "@/types/explain/tip";
import { getTipIcon } from "@/util/explain/tip";
import React from "react";

import { FaMagnifyingGlass } from "react-icons/fa6";

interface TipPanelProps {
  tip: Tip;
}

const TipPanel = (props: TipPanelProps) => {
  const tipIcon = getTipIcon(props.tip.type);

  return (
    <div className="w-full text-left flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <div className="flex flex-row flex-grow items-start gap-4">
          <tipIcon.icon size={24} color={tipIcon.color} />
          <h1 className="text-xl">{props.tip.title}</h1>
        </div>
        <div className="flex flex-row gap-1 select-none text-gray-300 hover:cursor-pointer hover:text-blue-300 transition-colors duration-100">
          <span className="text-xs ">explain</span>
          <FaMagnifyingGlass size={16} color={"gray"} />
        </div>
      </div>

      <div className="flex flex-row flex-grow gap-2 text-justify text-xs">
        <p>{props.tip.content}</p>
      </div>
      {props.tip.image != null && (
        <div className="flex flex-row items-center justify-center">
          <img
            src={props.tip.image}
            width={128}
            height={128}
            alt="FS Explaination image"
          />
        </div>
      )}
      {props.tip.link != null && (
        <div>
          <a
            href={props.tip.link}
            target="_blank"
            rel="noreferrer"
            className="ml-4 underline hover:text-blue-300 transition-colors duration-100"
          >
            Learn more
          </a>
        </div>
      )}
    </div>
  );
};

export default TipPanel;
