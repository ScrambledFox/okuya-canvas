import { Children, useEffect, useState } from "react";
import Container from "../ui/container";
import TipPanel from "./tip";

import { v4 as uuidv4 } from "uuid";
import { getTipIcon } from "@/util/explain/tip";
import { useSelectToolState } from "@/state/tools/selectToolState";
import { useTipState } from "@/state/explain/tipState";
import { Tip } from "@/types/explain/tip";

const TipWrapper = ({
  children,
}: {
  children: React.JSX.Element | React.JSX.Element[];
}) => {
  const arrayChildren = Children.toArray(children);

  return (
    <div className="flex flex-col items-center justify-center ">
      {arrayChildren.map((item, i) => {
        return (
          <>
            {i === 0 && <span className="mt-2" />}
            {item}
            {i !== arrayChildren.length - 1 && (
              <span className="w-full border-t-2 border-zinc-800 mt-2 mb-2" />
            )}
          </>
        );
      })}
    </div>
  );
};

const ExplainabilityPanel = () => {
  const selectedId = useSelectToolState((state) => state.selectedObject);
  const tips = useTipState((state) => state.tips);

  const [tipsSelected, setTipsSelected] = useState<Tip[]>([]);

  useEffect(() => {
    if (selectedId !== null) {
      setTipsSelected(tips.filter((tip) => tip.furnitureId === selectedId));
    }
  }, [selectedId, tips]);

  return (
    tips.length > 0 && (
      <Container className="w-1/6 h-5/6 right-36 top-16 overflow-y-scroll">
        <div className="justify-center ">
          <TipWrapper>
            {tipsSelected.map((tip, i) => {
              return <TipPanel key={i} tip={tip} />;
            })}
          </TipWrapper>
        </div>
      </Container>
    )
  );
};

export default ExplainabilityPanel;
