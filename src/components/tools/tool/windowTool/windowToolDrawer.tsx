import { useWindowToolState } from "@/state/tools/windowToolState";
import LineTool from "../lineTool/lineTool";

const WindowToolDrawer = () => {
  const start = useWindowToolState((state) => state.lineStart);

  const onCancelLine = () => {
    useWindowToolState.getState().cancelLine();
  };

  return <LineTool start={start} onCancel={onCancelLine} />;
};

export default WindowToolDrawer;
