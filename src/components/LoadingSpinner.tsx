import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({ smallHeight }: { smallHeight?: boolean }) => {
  return (
    <div
      className={` ${smallHeight ? "h-[250px]" : "h-[70vh]"}
      flex
      flex-col
      justify-center
      items-center `}
    >
      <ScaleLoader height={55} width={5} color="#009CFE" />
    </div>
  );
};

export default LoadingSpinner;
