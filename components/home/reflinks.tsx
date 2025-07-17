import Link from "next/link";

const RefLinks = () => (
  <div className="flex flex-col text-center items-center">
    <Link href={"/examples"} className="text-blue-700">
      See Example Images
    </Link>
    <Link
      href={"https://github.com/Navraj2071/anomalydetector.git"}
      className="text-blue-700 inline-flex items-center"
      target="_blank"
    >
      Github link
    </Link>
  </div>
);

export default RefLinks;
