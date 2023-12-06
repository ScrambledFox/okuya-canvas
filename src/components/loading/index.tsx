import { GridLoader } from "react-spinners";

const LoadingElement = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center text-center">
      <GridLoader color="white" size={50} />
    </div>
  );
};

export default LoadingElement;
