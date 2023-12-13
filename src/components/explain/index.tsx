import { Children } from "react";
import Container from "../ui/container";
import TipPanel from "./tip";

const ExplainabilityPanel = () => {
  return (
    <Container className="w-1/6 h-2/3 right-36 top-16 ">
      <div className="justify-center text-center">
        <h1 className="text-neutral-100 text-lg font-semibold">
          Placement Info
        </h1>
        <TipWrapper>
          <TipPanel tip="Tip 1" />
          <TipPanel tip="Tip 2" />
          <TipPanel tip="Tip 3" />
          <TipPanel tip="Tip 4" />
        </TipWrapper>
      </div>
    </Container>
  );
};

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
            {item}
            <span className="w-full border-t-2 border-zinc-800" />
          </>
        );
      })}
    </div>
  );
};

export default ExplainabilityPanel;
