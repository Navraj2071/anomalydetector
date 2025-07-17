import Image from "next/image";
import { useEffect, useState } from "react";
import Legend from "./legend";
import ResultRow from "./resiltrow";

type ViewerProps = {
  images: File[];
  results: { anomaly_score: number; image_index: number; reasoning: string }[];
};

type Datapoint = {
  url: string;
  result: {
    anomaly_score: number;
    image_index: number;
    reasoning: string;
  };
};

const Resultviewer = ({ images, results }: ViewerProps) => {
  const [data, setData] = useState<Datapoint[]>([]);

  useEffect(() => {
    const dataFiles = [];

    for (let i = 0; i <= images.length - 1; i++) {
      try {
        dataFiles.push({
          url: URL.createObjectURL(images[i]),
          result: results[i],
        });
      } catch {}
    }
    setData(dataFiles);
  }, [images, results]);

  if (data.length === 0) return null;
  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[760px] bg-blue-900/10 p-5 m-5 text-black">
      <h1 className="text-xl font-bold mb-6 text-gray-800">
        Analysis Results:
      </h1>
      <Legend />
      {data.map((datapoint, i) => (
        <ResultRow key={i} datapoint={datapoint} />
      ))}
    </div>
  );
};

export default Resultviewer;
