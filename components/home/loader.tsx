import { BounceLoader } from "react-spinners";

type LoaderProps = {
  message?: string;
};

const Loader = ({ message }: LoaderProps) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black/80 flex flex-col items-center justify-center">
      <BounceLoader color="#ffffff" loading={true} />
      <br />
      <p>{message}</p>
    </div>
  );
};

export default Loader;
